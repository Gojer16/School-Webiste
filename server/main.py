from fastapi import FastAPI
from server.routers import auth, teachers
from typing import Union

app = FastAPI()

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(teachers.router, prefix="/teachers", tags=["teachers"])

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.on_event("startup")
async def startup_event():
    print("App starting up!")

    
