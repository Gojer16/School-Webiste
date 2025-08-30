"""
Authentication Router (Async Version)
-------------------------------------
Provides endpoints for:
- User Registration
- User Login (JWT Authentication)
- Current User Info
- Protected Routes (requires authentication)

This router integrates with FastAPI's dependency injection,
SQLAlchemy AsyncSession for DB access, and JWT-based authentication.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from ..schemas import UserSchemas
from ..models import user as user_model
from .. import database, security
from ..database import SessionLocal

router = APIRouter()

# Dependency: async DB session
async def get_db() -> AsyncSession:
    """
    Async DB dependency.
    Yields an AsyncSession from SessionLocal.
    """
    async with SessionLocal() as session:
        yield session


@router.post("/register", response_model=UserSchemas.Read, status_code=status.HTTP_201_CREATED)
async def register(user: UserSchemas.Create, db: AsyncSession = Depends(get_db)):
    """
    Register a new user (async).
    """
    # Check if email exists
    result = await db.execute(
        select(user_model.User).filter(user_model.User.email == user.email)
    )
    db_user = result.scalars().first()

    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    # Hash password
    hashed_pw = security.hash_password(user.password)

    new_user = user_model.User(
        email=user.email,
        password_hash=hashed_pw,
        role=user.role,
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user


@router.post("/login", status_code=status.HTTP_200_OK)
async def login(user: UserSchemas.Login, db: AsyncSession = Depends(get_db)):
    """
    Authenticate a user (async).
    """
    result = await db.execute(
        select(user_model.User).filter(user_model.User.email == user.email)
    )
    db_user = result.scalars().first()

    if not db_user or not security.verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = security.create_access_token(
        {"sub": db_user.email, "role": db_user.role}
    )

    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=UserSchemas.Read, status_code=status.HTTP_200_OK)
async def read_users_me(current_user: user_model.User = Depends(security.get_current_user)):
    """
    Retrieve current user (async).
    """
    return current_user
