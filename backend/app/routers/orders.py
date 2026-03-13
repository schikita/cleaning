from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.deps import get_db, get_current_user
from app.models.order import Order
from app.models.user import User
from app.schemas.order import OrderCreate, OrderResponse, OrderUpdate

router = APIRouter(prefix="/orders", tags=["Orders"])


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
    """List orders with optional filters (public feed)."""
    q = db.query(Order)
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
def create_order(
    order_in: OrderCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a new order (requires authentication)."""
    order = Order(
        title=order_in.title,
        description=order_in.description,
        category=order_in.category,
        quality=order_in.quality,
        budget=order_in.budget,
        address=order_in.address,
        city=order_in.city,
        date=order_in.date,
        client_id=current_user.id,  # Обязательно берем ID из токена
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: str, db: Session = Depends(get_db)):
    """Get order by ID."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.patch("/{order_id}", response_model=OrderResponse)
def update_order(
    order_id: str,
    order_in: OrderUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update order (requires ownership)."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.client_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    for key, value in order_in.model_dump(exclude_unset=True).items():
        setattr(order, key, value)
    db.commit()
    db.refresh(order)
    return order


@router.delete("/{order_id}", status_code=204)
def delete_order(
    order_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete order (requires ownership)."""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.client_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    db.delete(order)
    db.commit()
    return None
