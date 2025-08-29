from pydantic import BaseModel, validator

class UserCreate(BaseModel):
    email: str
    password: str
    role: str = "teacher"
    
    @validator("email")
    def validate_email(cls, v):
        if "@" not in v:
            raise ValueError("Invalid email")
        return v

    @validator("password")
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        return v

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    role: str
    is_active: bool

    class Config:
        orm_mode = True
