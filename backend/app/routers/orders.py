"""Orders router."""
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session, joinedload

from app.deps import get_db
from app.models.order import Order, calc_commission
from app.models.order_response import OrderResponseModel
from app.models.user import User
from app.schemas.order import OrderCreate, OrderResponse, OrderResponseItem, OrderUpdate

router = APIRouter(prefix="/orders", tags=["Orders"])


class OrderRespondRequest(BaseModel):
    """Request body for performer responding to an order."""
    performer_id: str


class OrderApproveRequest(BaseModel):
    """Admin approves a performer for the order."""
    performer_id: str


@router.get("", response_model=list[OrderResponse])
def list_orders(
    skip: int = 0,
    limit: int = 100,
    status: str | None = Query(None),
    city: str | None = Query(None),
    client_id: str | None = Query(None),
    performer_id: str | None = Query(None),
    db: Session = Depends(get_db),
):
    """List orders with optional filters."""
    q = db.query(Order).options(
        joinedload(Order.client),
        joinedload(Order.performer),
    )
    if status:
        q = q.filter(Order.status == status)
    if city:
        q = q.filter(Order.city.ilike(f"%{city}%"))
    if client_id:
        q = q.filter(Order.client_id == client_id)
    if performer_id:
        q = q.filter(Order.performer_id == performer_id)
    orders = q.order_by(Order.created_at.desc()).offset(skip).limit(limit).all()
    return orders


@router.post("", response_model=OrderResponse)
def create_order(order_in: OrderCreate, db: Session = Depends(get_db)):
    """Create a new order."""
    client = db.query(User).filter(User.id == order_in.client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    order = Order(
        title=order_in.title,
        description=order_in.description,
        category=order_in.category,
        quality=order_in.quality,
        budget=order_in.budget,
        address=order_in.address,
        city=order_in.city,
        date=order_in.date,
        client_id=order_in.client_id,
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


@router.post("/{order_id}/respond")
def respond_to_order(
    order_id: str,
    body: OrderRespondRequest,
    db: Session = Depends(get_db),
):
    """Performer responds to (bids on) an order."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.status != "open":
        raise HTTPException(
            status_code=400,
            detail="Order is no longer accepting responses",
        )
    # Check if performer already responded
    existing = (
        db.query(OrderResponseModel)
        .filter(
            OrderResponseModel.order_id == order_id,
            OrderResponseModel.performer_id == body.performer_id,
        )
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=400,
            detail="You have already responded to this order",
        )
    # Create response
    resp = OrderResponseModel(
        order_id=order_id,
        performer_id=body.performer_id,
    )
    db.add(resp)
    order.responses_count = (order.responses_count or 0) + 1
    db.commit()
    return {"ok": True, "message": "Response submitted"}


@router.get("/{order_id}/responses", response_model=list[OrderResponseItem])
def get_order_responses(order_id: str, db: Session = Depends(get_db)):
    """Get all performer responses for an order (for admin)."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    responses = (
        db.query(OrderResponseModel)
        .options(joinedload(OrderResponseModel.performer))
        .filter(OrderResponseModel.order_id == order_id)
        .order_by(OrderResponseModel.created_at.desc())
        .all()
    )
    return responses


@router.post("/{order_id}/approve")
def approve_performer(
    order_id: str,
    body: OrderApproveRequest,
    db: Session = Depends(get_db),
):
    """Admin approves a performer. Order goes to awaiting_payment."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.status != "open":
        raise HTTPException(
            status_code=400,
            detail="Order is no longer open for approval",
        )
    # Verify performer responded
    resp = (
        db.query(OrderResponseModel)
        .filter(
            OrderResponseModel.order_id == order_id,
            OrderResponseModel.performer_id == body.performer_id,
        )
        .first()
    )
    if not resp:
        raise HTTPException(
            status_code=400,
            detail="Performer has not responded to this order",
        )
    order.performer_id = body.performer_id
    order.status = "awaiting_payment"
    order.payment_status = "pending"
    order.payment_amount = calc_commission(order.budget)
    db.commit()
    return {"ok": True, "payment_amount": order.payment_amount}


@router.post("/{order_id}/mark-paid")
def mark_order_paid(order_id: str, db: Session = Depends(get_db)):
    """Admin marks order as paid (performer paid commission)."""
    from datetime import datetime, timezone

    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.status != "awaiting_payment":
        raise HTTPException(
            status_code=400,
            detail="Order is not awaiting payment",
        )
    order.payment_status = "paid"
    order.payment_completed_at = datetime.now(timezone.utc)
    db.commit()
    return {"ok": True}


@router.post("/{order_id}/send-info")
def send_info_to_performer(order_id: str, db: Session = Depends(get_db)):
    """Admin sends full info to performer. Order goes to in_progress."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.status != "awaiting_payment":
        raise HTTPException(
            status_code=400,
            detail="Order must be awaiting payment first",
        )
    if order.payment_status != "paid":
        raise HTTPException(
            status_code=400,
            detail="Performer must pay before sending info",
        )
    order.status = "in_progress"
    db.commit()
    return {"ok": True}


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: str, db: Session = Depends(get_db)):
    """Get order by ID."""
    order = (
        db.query(Order)
        .options(
            joinedload(Order.client),
            joinedload(Order.performer),
        )
        .filter(Order.id == order_id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.patch("/{order_id}", response_model=OrderResponse)
def update_order(
    order_id: str,
    order_in: OrderUpdate,
    db: Session = Depends(get_db),
):
    """Update order."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    for key, value in order_in.model_dump(exclude_unset=True).items():
        setattr(order, key, value)
    db.commit()
    db.refresh(order)
    return order


@router.delete("/{order_id}", status_code=204)
def delete_order(order_id: str, db: Session = Depends(get_db)):
    """Delete order."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(order)
    db.commit()
    return None
