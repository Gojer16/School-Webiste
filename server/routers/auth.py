from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import user as user_model
from .. import database, schemas, security

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = security.hash_password(user.password)
    new_user = user_model.User(
        email=user.email,
        password_hash=hashed_pw,
        role=user.role,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if not db_user or not security.verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = security.create_access_token(
        {"sub": db_user.email, "role": db_user.role}
    )
    
    return {"access_token": token, "token_type": "bearer"}
