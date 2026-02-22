"""Order schemas."""
from datetime import datetime
from typing import Optional, Union

from pydantic import BaseModel

from app.schemas.user import UserResponse


class OrderBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    quality: str = "standard"  # economy, standard, premium
    budget: Optional[float] = None  # None = negotiable
    address: str
    city: str
    date: Optional[datetime] = None


class OrderCreate(OrderBase):
    client_id: str


class OrderUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    quality: Optional[str] = None
    budget: Optional[float] = None
    address: Optional[str] = None
    city: Optional[str] = None
    date: Optional[datetime] = None
    status: Optional[str] = None


class OrderResponse(OrderBase):
    id: str
    client_id: str
    client: Optional[UserResponse] = None
    responses_count: int = 0
    status: str = "open"
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
