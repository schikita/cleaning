"""User schemas."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    name: str
    email: EmailStr
    avatar: Optional[str] = None
    role: str = "client"


class UserCreate(UserBase):
    password: str | None = Field(
        None,
        description="Пароль (рекомендуется указывать при создании для входа в админку)",
        min_length=6,
    )


class UserSetPassword(BaseModel):
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str
    avatar: Optional[str] = None

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None
    role: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    bio: Optional[str] = None
    services: Optional[list[str]] = None
    badges: Optional[list[str]] = None


class UserResponse(UserBase):
    id: str
    rating: float = 0.0
    completed_orders: int = 0
    phone: Optional[str] = None
    city: Optional[str] = None
    bio: Optional[str] = None
    services: Optional[list[str]] = None
    badges: Optional[list[str]] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
