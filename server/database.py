"""
Database configuration module.
- Loads DATABASE_URL from environment (.env)
- Creates an async SQLAlchemy engine for DB communication
- Provides SessionLocal for generating DB sessions per request
- Defines Base for all ORM models to inherit from
"""
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL not set in environment!")

engine = create_async_engine(
    DATABASE_URL, 
    echo=True,
    future=True 
)

SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()