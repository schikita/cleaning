"""Order model."""
import uuid
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=False)
    quality = Column(String(20), nullable=False, default="standard")  # economy, standard, premium
    budget = Column(Float, nullable=True)  # null = negotiable
    address = Column(String(512), nullable=False)
    city = Column(String(100), nullable=False)
    date = Column(DateTime(timezone=True), nullable=True)
    responses_count = Column(Integer, default=0)
    status = Column(String(20), default="open")  # open, in_progress, completed, cancelled
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    client_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    client = relationship("User", back_populates="orders", foreign_keys=[client_id])
