"""User schemas."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    name: str
    email: EmailStr
    avatar: Optional[str] = None
    role: str = "client"


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None
    role: Optional[str] = None


class UserResponse(UserBase):
    id: str
    rating: float = 0.0
    completed_orders: int = 0
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
