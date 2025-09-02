"""
CRUD operations for TeacherProfile model.
This module defines the database access layer for teacher profiles.
"""
from server.models.user import User
from server.security import hash_password
from sqlalchemy.orm import Session
from ..models.teacherProfile import TeacherProfile  
from ..schemas.TeacherProfileSchemas import TeacherProfileCreate
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import logging
from uuid import uuid4
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from ..models.user import User
from ..security import hash_password

logger = logging.getLogger(__name__)



async def _create_user_for_teacher(db: AsyncSession, email: Optional[str] = None, password: Optional[str] = None) -> User:
    """
    Create a User row to be associated with a new TeacherProfile.

    If email is None, generate a unique email using uuid4.
    If password is None, generate a random password (hashed) — caller must handle password reset flows.
    Returns the created User object.
    """
    # Generate fallback email and password if not provided
    if email is None:
        # Use a namespaced unique email so uniqueness constraint satisfied
        email = f"auto-teacher-{uuid4().hex}@example.com"
    if password is None:
        # generate a random string as password; admin/teacher must reset it
        password = uuid4().hex

    user = User(email=email, password_hash=hash_password(password), role="teacher", is_active=True)
    db.add(user)
    await db.flush()   # populate user.id
    return user


async def create_teacher_with_auto_user(
    db: AsyncSession,
    name: str,
    bio: str = "",
    image_url: str = "",
    is_active: bool = True,
    email: Optional[str] = None,
    password: Optional[str] = None,
    user_id: Optional[int] = None,
):
    """
    Create a TeacherProfile. If `user_id` is provided, link to that user;
    otherwise create a new User (optionally using provided email/password).

    Args:
        db (AsyncSession): DB session (async).
        name, bio, image_url, is_active: teacher profile fields.
        email, password: optional credentials to create the User with.
        user_id: optional existing user id to link to (admins may pass it; we prefer None for safety).

    Returns:
        TeacherProfile: newly created profile.

    Raises:
        HTTPException: 400/404/500 depending on error.
    """
    try:
        # If user_id provided -> validate exists
        if user_id:
            user_res = await db.execute(select(User).where(User.id == user_id))
            user_obj = user_res.scalars().one_or_none()
            if user_obj is None:
                raise HTTPException(status_code=404, detail=f"User {user_id} not found.")
        else:
            # create new user (auto-generated email/password if not provided)
            user_obj = await _create_user_for_teacher(db, email=email, password=password)

        # Guard: ensure no existing TeacherProfile for that user (1-to-1)
        existing = await db.execute(select(TeacherProfile).where(TeacherProfile.user_id == user_obj.id))
        if existing.scalars().one_or_none():
            raise HTTPException(status_code=400, detail=f"User {user_obj.id} already has a teacher profile.")

        # create profile
        new_profile = TeacherProfile(
            user_id=user_obj.id,
            name=name,
            bio=bio or "",
            image_url=image_url or "",
            is_active=is_active
        )
        db.add(new_profile)
        await db.commit()
        await db.refresh(new_profile)

        return new_profile

    except IntegrityError as e:
        await db.rollback()
        logger.warning("IntegrityError creating teacher profile: %s", e)
        raise HTTPException(status_code=400, detail="Teacher profile could not be created due to integrity constraints.") from e

    except SQLAlchemyError as e:
        await db.rollback()
        logger.exception("Unexpected DB error creating teacher profile")
        raise HTTPException(status_code=500, detail="Unexpected database error while creating teacher profile.") from e

def get_teacher_by_user_id(db: Session, user_id: int) -> Optional[TeacherProfile]:
    """
    Retrieve a teacher profile by the associated user ID.

    Args:
        db (Session): SQLAlchemy session.
        user_id (int): The user ID linked to the teacher profile.

    Returns:
        Optional[TeacherProfile]: The teacher profile if found, else None.
    """
    return db.query(TeacherProfile).filter(TeacherProfile.user_id == user_id).first()


async def list_active_teachers(db: AsyncSession, skip: int = 0, limit: int = 10) -> List[TeacherProfile]:
    """
    Paginated list of active teachers (async).
    """
    result = await db.execute(
        select(TeacherProfile)
        .filter(TeacherProfile.is_active == True)
        .offset(skip)
        .limit(limit)
    )
    return result.scalars().all()

async def get_active_teachers(db: AsyncSession) -> List[TeacherProfile]:
    """
    Retrieve all active teacher profiles (async).
    """
    result = await db.execute(
        select(TeacherProfile).filter(TeacherProfile.is_active == True)
    )
    return result.scalars().all()



def get_teacher_by_id(db: Session, teacher_id: int) -> Optional[TeacherProfile]:
    """
    Retrieve a teacher profile by its primary ID.

    Args:
        db (Session): SQLAlchemy session.
        teacher_id (int): The ID of the teacher profile.

    Returns:
        Optional[TeacherProfile]: The teacher profile if found, else None.
    """
    return db.query(TeacherProfile).filter(TeacherProfile.id == teacher_id).first()

def deactivate_teacher(db: Session, teacher_id: int) -> Optional[TeacherProfile]:
    """Mark a teacher as inactive (soft delete)."""
    teacher = db.query(TeacherProfile).filter(TeacherProfile.id == teacher_id).first()
    if teacher:
        teacher.is_active = False
        db.commit()
        db.refresh(teacher)
    return teacher

def activate_teacher(db: Session, teacher_id: int) -> Optional[TeacherProfile]:
    """Mark a teacher as active again."""
    teacher = db.query(TeacherProfile).filter(TeacherProfile.id == teacher_id).first()
    if teacher:
        teacher.is_active = True
        db.commit()
        db.refresh(teacher)
    return teacher