"""
Main FastAPI application entry point.

This file wires together the application, including routers and 
lifecycle events. It acts as the central hub for the API.
"""
from fastapi import FastAPI
from server.routers import auth, teachers

app = FastAPI(
    title="School API",
    description="API for managing authentication and teacher profiles.",
    version="1.0.1",
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(teachers.router, prefix="/teachers", tags=["teachers"])

@app.get("/", tags=["root"])
async def read_root():
    return {"status": "ok", "message": "School API is running"}

@app.on_event("startup")
async def startup_event():
    print("🚀 App starting up!")

    
