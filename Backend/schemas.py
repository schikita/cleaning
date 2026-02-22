"""Pydantic schemas for request / response validation."""

from __future__ import annotations
from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, EmailStr


# ── Auth ─────────────────────────────────────────────────
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "client"  # client | performer
    phone: Optional[str] = None
    city: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: str
    avatar: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    bio: Optional[str] = None
    rating: float
    completed_orders: int
    created_at: datetime

    class Config:
        from_attributes = True


# ── Order ────────────────────────────────────────────────
class OrderCreate(BaseModel):
    title: str
    description: str
    service_type: str
    budget: Optional[float] = None
    address: Optional[str] = None
    city: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    urgent: bool = False
    details_json: Optional[dict[str, Any]] = None


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    performer_id: Optional[int] = None


class ClientBrief(BaseModel):
    name: str
    rating: float

    class Config:
        from_attributes = True


class OrderOut(BaseModel):
    id: int
    title: str
    description: str
    service_type: str
    category: str
    budget: Optional[float] = None
    address: Optional[str] = None
    city: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    status: str
    urgent: bool
    client: ClientBrief
    responses_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


# ── OrderResponse ────────────────────────────────────────
class ResponseCreate(BaseModel):
    message: Optional[str] = None
    price: Optional[float] = None


class ResponseOut(BaseModel):
    id: int
    order_id: int
    performer_id: int
    performer_name: str = ""
    performer_rating: float = 0.0
    message: Optional[str] = None
    price: Optional[float] = None
    created_at: datetime

    class Config:
        from_attributes = True


# ── Review ───────────────────────────────────────────────
class ReviewCreate(BaseModel):
    order_id: int
    performer_id: int
    rating: int  # 1-5
    text: Optional[str] = None


class ReviewOut(BaseModel):
    id: int
    author: str = ""
    rating: int
    text: Optional[str] = None
    date: str = ""

    class Config:
        from_attributes = True


# ── Gamification ─────────────────────────────────────────
class PerformerStatsOut(BaseModel):
    level: str
    xp: int
    xp_to_next: int
    credits: int
    bonus_credits: int
    skills: list[dict[str, Any]] = []
    badges: list[dict[str, Any]] = []

    class Config:
        from_attributes = True


class ChestResult(BaseModel):
    reward_type: str  # "credits"
    amount: int


# ── Performer profile ───────────────────────────────────
class PerformerProfileOut(BaseModel):
    name: str
    rating: float
    reviews_count: int = 0
    completed_orders: int
    member_since: str = ""
    level: str
    city: Optional[str] = None
    phone: Optional[str] = None
    email: str
    bio: Optional[str] = None
    services: list[str] = []
    badges: list[dict[str, Any]] = []
    reviews: list[ReviewOut] = []


class ProfileUpdate(BaseModel):
    bio: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    services: Optional[list[str]] = None


# ── Client dashboard ─────────────────────────────────────
class ClientDashboard(BaseModel):
    total_orders: int
    active_orders: int
    completed_orders: int
    total_spent: float
    orders: list[OrderOut] = []
