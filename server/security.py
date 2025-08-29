"""
security.py
This module provides authentication utilities, including:
- Password hashing and verification.
- JWT access token creation.
- Current user retrieval using OAuth2 Bearer token.
- Database session management.

Security best practices followed:
- Passwords hashed with bcrypt.
- Secret keys loaded from environment.
- JWT tokens include standard claims (exp, iat, sub).
"""
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
import os
from sqlalchemy.orm import Session
from . import database, models
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from dotenv import load_dotenv
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY is not set in environment!")

ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_db():
    """
    Provides a database session for FastAPI routes via dependency injection.
    Ensures session is closed after request finishes.
    Usage in route:
        db: Session = Depends(get_db)
    """
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    """
    Hash a plain-text password using bcrypt.
    Args:
        password (str): Plain text password.
    Returns:
        str: Hashed password.
    """
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    """
    Verify a plain-text password against a hashed password.
    Args:
        plain_password (str): Plain text password.
        hashed_password (str): Password hash stored in database.

    Returns:
        bool: True if passwords match, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta = None):
    """
    Create a JWT access token.
    Args:
        data (dict): Dictionary containing user data (e.g., {"sub": user.email}).
        expires_delta (timedelta, optional): Custom token expiration. Defaults to ACCESS_TOKEN_EXPIRE_MINUTES.
    Returns:
        str: Encoded JWT token.
    """
    to_encode = data.copy()

    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

    to_encode.update({
        "exp": expire,                  # Expiration time
        "iat": datetime.utcnow(),       # Issued at
        "sub": str(data.get("sub"))     # Subject (user identifier)
    })

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(
    token: str = Depends(oauth2_scheme), 
    db: Session = Depends(get_db)
):
    """
    FastAPI dependency to retrieve the currently authenticated user from a JWT token.
    Steps:
    1. Decode JWT token from Authorization header.
    2. Extract 'sub' claim (user email).
    3. Fetch user from database.
    4. Raise 401 Unauthorized if token invalid or user not found.

    Usage in route:
        user = Depends(get_current_user)
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(models.user.User).filter(models.user.User.email == email).first()
    if user is None:
        raise credentials_exception

    return user