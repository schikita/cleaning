"""User model."""
import uuid
from sqlalchemy import Column, String, Float, Integer, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    avatar = Column(String(512), nullable=True)
    role = Column(String(20), nullable=False, default="client")
    rating = Column(Float, default=0.0)
    completed_orders = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    orders = relationship("Order", back_populates="client", foreign_keys="Order.client_id")
