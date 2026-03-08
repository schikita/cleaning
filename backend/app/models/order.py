"""Order model."""
import uuid
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base


def calc_commission(budget: float | None) -> float:
    """Commission: 5% if budget > 150 BYN, else 20 BYN fixed."""
    if budget is None:
        return 20.0
    return (budget * 0.05) if budget > 150 else 20.0


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
    # open, awaiting_payment, in_progress, completed, cancelled
    status = Column(String(20), default="open")
    payment_status = Column(String(20), default="pending")  # pending, paid
    payment_amount = Column(Float, nullable=True)  # commission to pay
    payment_completed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    client_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    performer_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    client = relationship("User", back_populates="orders", foreign_keys=[client_id])
    performer = relationship("User", foreign_keys=[performer_id])
