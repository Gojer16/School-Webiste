"""
CRUD operations for TeacherProfile model.
This module defines the database access layer for teacher profiles.
"""
from sqlalchemy.orm import Session
from ..models.teacherProfile import TeacherProfile
from ..schemas.TeacherProfileSchemas import TeacherProfileCreate
from typing import Optional, List
from sqlalchemy.exc import IntegrityError


def create_teacher_profile(db: Session, user_id: int, profile: TeacherProfileCreate) -> Optional[TeacherProfile]:
    """
    Create a new teacher profile for a given user.

    Args:
        db (Session): SQLAlchemy session for DB access.
        user_id (int): ID of the user owning the teacher profile.
        profile (TeacherProfileCreate): Pydantic schema with profile data.

    Returns:
        TeacherProfile: The newly created and persisted teacher profile.
    """
    try:
        db_profile = TeacherProfile(**profile.dict(), user_id=user_id)
        db.add(db_profile)
        db.commit()
        db.refresh(db_profile)
        return db_profile
    except IntegrityError:
        db.rollback()
        return None   


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


def list_active_teachers(db: Session, skip: int = 0, limit: int = 10) -> List[TeacherProfile]:
    """
    Paginated list of active teachers.

    Args:
        db (Session): SQLAlchemy session.
        skip (int): Number of records to skip (for pagination).
        limit (int): Maximum number of records to return.

    Returns:
        List[TeacherProfile]: List of active teacher profiles.
    """
    return (
        db.query(TeacherProfile)
        .filter(TeacherProfile.is_active == True)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_active_teachers(db: Session) -> List[TeacherProfile]:
    """
    Retrieve all active teacher profiles.

    Args:
        db (Session): SQLAlchemy session.

    Returns:
        List[TeacherProfile]: List of active teacher profiles.
    """
    return db.query(TeacherProfile).filter(TeacherProfile.is_active == True).all()


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