from pydantic import BaseModel, validator, EmailStr

class UserCreate(BaseModel):
    """
    Schema for creating a new user.
    - Requires an email, password, and optional role (default: 'teacher').
    - Includes custom validators for email and password strength.
    """
    email: EmailStr
    password: str
    role: str = "teacher"
    
    @validator("email")
    def validate_email(cls, v):
        """
        Extra email validation beyond EmailStr.
        Ensures that the email string contains '@' (redundant but explicit).
        """
        if "@" not in v:
            raise ValueError("Invalid email")
        return v

    @validator("password")
    def password_strength(cls, v):
        """
        Enforces basic password security rules:
        - Minimum length of 8
        - Must contain at least one number
        - Must contain at least one uppercase letter
        """
        if len(v) < 8:
            raise ValueError("Password too short")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain a number")
        if not any(c.isupper() for c in v):
            raise ValueError("Password must contain an uppercase letter")
        return v

class UserLogin(BaseModel):
    """
    Schema for user login.
    - Only requires email and password.
    - No role or status is needed at login.
    """
    email: EmailStr
    password: str

class UserRead(BaseModel):
    """
    Schema for returning user information to the client.
    - Includes fields that describe the user but excludes sensitive data
      like the raw password.
    - orm_mode=True allows automatic conversion from SQLAlchemy ORM objects.
    """
    id: int
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        orm_mode = True
