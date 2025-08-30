"""
TeacherProfile Model
Defines the database model for teacher profiles.
Each teacher profile is linked to exactly one user account (one-to-one relationship).
"""
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base
from .user import User

class TeacherProfile(Base):    
    """
    Database model for storing teacher profile information.

    Each TeacherProfile is linked to a single User via `user_id`. 
    This ensures that every teacher has a corresponding user account 
    (e.g., for authentication and authorization).

    Attributes:
        id (int): Primary key identifier for the teacher profile.
        user_id (int): Foreign key linking to the associated User.
        name (str): Teacher's display name (required).
        bio (str, optional): Short biography or description of the teacher.
        image_url (str, optional): URL to the teacher's profile image.
        is_active (bool): Flag indicating whether the teacher's profile is active.
    """
    __tablename__ = "teacher_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    bio = Column(String(500))
    image_url = Column(String(255))
    is_active = Column(Boolean, default=True)
    created_at = Column(String(50))
    updated_at = Column(String(50))
    deleted_at = Column(String(50), nullable=True)

    user = relationship("User", back_populates="teacher_profile")
