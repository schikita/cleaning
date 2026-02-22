import datetime as _dt
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON,
)
from sqlalchemy.orm import relationship
from database import Base


# ── User ─────────────────────────────────────────────────
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False, default="client")  # client | performer | admin
    avatar = Column(String(500), nullable=True)
    phone = Column(String(30), nullable=True)
    city = Column(String(100), nullable=True)
    bio = Column(Text, nullable=True)
    rating = Column(Float, default=0.0)
    completed_orders = Column(Integer, default=0)
    created_at = Column(DateTime, default=_dt.datetime.utcnow)

    # relationships
    orders_as_client = relationship("Order", back_populates="client", foreign_keys="Order.client_id")
    orders_as_performer = relationship("Order", back_populates="performer", foreign_keys="Order.performer_id")
    responses = relationship("OrderResponse", back_populates="performer")
    reviews_written = relationship("Review", back_populates="author", foreign_keys="Review.author_id")
    reviews_received = relationship("Review", back_populates="performer", foreign_keys="Review.performer_id")
    performer_profile = relationship("PerformerProfile", back_populates="user", uselist=False)


# ── Order ────────────────────────────────────────────────
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    description = Column(Text, nullable=False)
    service_type = Column(String(30), nullable=False)  # general, maintenance, renovation, furniture, windows, office, cottage
    category = Column(String(50), default="Клининг")
    budget = Column(Float, nullable=True)
    address = Column(String(500), nullable=True)
    city = Column(String(100), nullable=True)
    date = Column(String(20), nullable=True)
    time = Column(String(10), nullable=True)
    status = Column(String(20), default="active")  # active | in_progress | completed | cancelled
    urgent = Column(Boolean, default=False)
    details_json = Column(JSON, nullable=True)  # service-specific details

    client_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    performer_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    created_at = Column(DateTime, default=_dt.datetime.utcnow)

    client = relationship("User", back_populates="orders_as_client", foreign_keys=[client_id])
    performer = relationship("User", back_populates="orders_as_performer", foreign_keys=[performer_id])
    responses = relationship("OrderResponse", back_populates="order", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="order", cascade="all, delete-orphan")


# ── OrderResponse (performer bids on an order) ──────────
class OrderResponse(Base):
    __tablename__ = "order_responses"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    performer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    message = Column(Text, nullable=True)
    price = Column(Float, nullable=True)
    created_at = Column(DateTime, default=_dt.datetime.utcnow)

    order = relationship("Order", back_populates="responses")
    performer = relationship("User", back_populates="responses")


# ── Review ───────────────────────────────────────────────
class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    performer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    rating = Column(Integer, nullable=False)  # 1-5
    text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=_dt.datetime.utcnow)

    order = relationship("Order", back_populates="reviews")
    author = relationship("User", back_populates="reviews_written", foreign_keys=[author_id])
    performer = relationship("User", back_populates="reviews_received", foreign_keys=[performer_id])


# ── PerformerProfile (gamification) ──────────────────────
class PerformerProfile(Base):
    __tablename__ = "performer_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    level = Column(String(20), default="new")  # new | bronze | silver | gold | platinum
    xp = Column(Integer, default=0)
    xp_to_next = Column(Integer, default=500)
    credits = Column(Integer, default=0)
    bonus_credits = Column(Integer, default=0)

    services = Column(JSON, default=list)      # list of service names
    badges = Column(JSON, default=list)        # [{label, color}]
    skills = Column(JSON, default=list)        # [{name, level, max, effect}]

    last_chest_opened = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="performer_profile")
