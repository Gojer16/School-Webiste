"""
schemas/__init__.py
Centralized schema registry for the application.
Purpose:
- Group Pydantic schemas for easier imports and maintainability.
- Provide a clear namespace for user- and teacher-related schemas.
- Avoid repeated imports of individual schema classes in other modules.
Usage:
    from server.schemas import UserSchemas, TeacherSchemas
    user_create = UserSchemas.Create(...)
    teacher_read = TeacherSchemas.Read(...)
"""
from .userSchemas import UserCreate, UserRead, UserLogin
from .TeacherProfileSchemas import TeacherProfileCreate, TeacherProfile

class UserSchemas:
    """
    Namespace for User schemas.
    Attributes:
        Create: Schema used when creating a new user.
        Read: Schema used when reading user information (response model).
        Login: Schema used for user login operations.
    """
    Create = UserCreate
    Read = UserRead
    Login = UserLogin

class TeacherSchemas:
    """
    Namespace for Teacher schemas.
    Attributes:
        Create: Schema used when creating a new teacher profile.
        Read: Schema used to read teacher profile information (response model).
    """
    Create = TeacherProfileCreate
    Read = TeacherProfile
