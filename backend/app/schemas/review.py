"""Review schemas."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ReviewBase(BaseModel):
    order_id: str
    performer_id: str
    client_id: str
    rating: int = Field(..., ge=1, le=5)
    text: Optional[str] = None


class ReviewCreate(ReviewBase):
    pass


class ReviewResponse(BaseModel):
    id: str
    order_id: str
    performer_id: str
    client_id: str
    rating: int
    text: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ReviewWithAuthorResponse(ReviewResponse):
    """Review with client display name (e.g. 'Анна М.')."""
    author: Optional[str] = None
