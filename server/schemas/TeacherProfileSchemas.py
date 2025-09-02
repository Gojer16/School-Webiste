from pydantic import BaseModel,  Field
from typing import Optional

class TeacherBase(BaseModel):
    name: str
    bio: Optional[str] = None
    image_url: Optional[str] = None
    is_active: bool = True

class TeacherProfileCreate(TeacherBase):
    """
    Simple create schema for admins to create a teacher.
    Optional: email/password if admin wants to set login credentials now.
    """
    email: Optional[str] = None      # optional: admin can provide a real email
    password: Optional[str] = None   # optional: admin can provide an initial password

class ReadTeacherProfile(TeacherBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True