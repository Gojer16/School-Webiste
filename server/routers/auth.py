"""
Authentication Router
---------------------
Provides endpoints for:
- User Registration
- User Login (JWT Authentication)
- Current User Info
- Protected Routes (requires authentication)

This router integrates with FastAPI's dependency injection,
SQLAlchemy for database access, and JWT-based authentication
through the security module.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from ..schemas import UserSchemas
from sqlalchemy.orm import Session
from ..models import user as user_model
from .. import database, security
from ..security import get_current_user


router = APIRouter()

def get_db():
    """
    Database dependency.
    Creates a session for each request and ensures
    it is closed afterwards.
    """
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserSchemas.Read, status_code=status.HTTP_201_CREATED)
def register(user: UserSchemas.Create, db: Session = Depends(get_db)):
    """
    Register a new user.

    - Validates if the email is unique.
    - Hashes the password before storing.
    - Persists the user into the database.

    Args:
        user (UserSchemas.Create): Incoming user data.
        db (Session): SQLAlchemy session.

    Returns:
        UserSchemas.Read: Newly created user (without password).
    """
    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()

    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    hashed_pw = security.hash_password(user.password)

    new_user = user_model.User(
        email=user.email,
        password_hash=hashed_pw,
        role=user.role,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post("/login", status_code=status.HTTP_200_OK)
def login(user: UserSchemas.Login, db: Session = Depends(get_db)):
    """
    Authenticate a user and return a JWT token.

    - Verifies user credentials.
    - Returns JWT for authorized sessions.

    Args:
        user (UserSchemas.Login): Email & password payload.
        db (Session): SQLAlchemy session.

    Returns:
        dict: JWT access token and type.
    """

    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()

    if not db_user or not security.verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = security.create_access_token(
        {"sub": db_user.email, "role": db_user.role}
    )
    
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me", response_model=UserSchemas.Read, status_code=status.HTTP_200_OK)
def read_users_me(current_user: user_model.User = Depends(security.get_current_user)):
    """
    Retrieve the currently authenticated user.

    Args:
        current_user (User): Injected from JWT token via dependency.

    Returns:
        UserSchemas.Read: User object of current session.
    """
    return current_user
