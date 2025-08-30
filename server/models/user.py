from sqlalchemy import Column, Integer, String, Boolean
from ..database import Base
from sqlalchemy.orm import relationship

class User(Base):
    """
    SQLAlchemy ORM model representing a system user.

    This model stores core authentication and role information for users.
    It also links to a teacher profile (if the user is a teacher).

    Table name: `users`
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), default="teacher") 
    is_active = Column(Boolean, default=True)

    teacher_profile = relationship("TeacherProfile", back_populates="user", uselist=False)
