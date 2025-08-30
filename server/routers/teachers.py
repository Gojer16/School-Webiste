"""
Teacher Router
Defines API endpoints for creating and retrieving teacher profiles.
Endpoints use the CRUD layer (`teacherProfileCrud`) to interact with the database.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..crud import teacherProfileCrud as crud
from ..schemas import TeacherSchemas
from ..security import get_current_user, get_db
from .. import database

router = APIRouter()

@router.post("/", response_model=TeacherSchemas.Read)
def create_profile(
    profile: TeacherSchemas.Create,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
):
    """
    Create a teacher profile for the currently authenticated user.

    - Only 'admin' users are authorized.
    - Returns the created teacher profile. 
    """
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can create teacher profiles.")

    return crud.create_teacher_profile(db, user_id=current_user.id, profile=profile)

@router.get("/", response_model=list[TeacherSchemas.Read])
def list_teachers_paginated(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    List active teacher profiles with pagination.

    Args:
        skip (int): Number of records to skip (default=0).
        limit (int): Max number of records to return (default=10).

    Returns:
        A paginated list of teacher profiles.
    """
    return crud.list_active_teachers(db, skip=skip, limit=limit)

@router.get("/all", response_model=list[TeacherSchemas.Read])
def list_all_teachers(db: Session = Depends(get_db)):
    """
    List all active teacher profiles without pagination.

    ⚠️ Use with caution: May return a large dataset.

    Returns:
        A list of all teacher profiles.
    """
    return crud.get_active_teachers(db)

@router.get("/{teacher_id}", response_model=TeacherSchemas.Read)
def read_teacher(teacher_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a teacher profile by ID.

    Args:
        teacher_id (int): ID of the teacher profile to fetch.

    Returns:
        Teacher profile matching the given ID.

    Raises:
        404 Not Found: If the teacher does not exist.
    """
    teacher = crud.get_teacher(db, teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found.")
    return teacher