"""Orders router – CRUD + responses."""

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from database import get_db
import models
import schemas
from auth import get_current_user

router = APIRouter(prefix="/api/orders", tags=["orders"])


def _order_to_out(order: models.Order) -> schemas.OrderOut:
    return schemas.OrderOut(
        id=order.id,
        title=order.title,
        description=order.description,
        service_type=order.service_type,
        category=order.category,
        budget=order.budget,
        address=order.address,
        city=order.city,
        date=order.date,
        time=order.time,
        status=order.status,
        urgent=order.urgent,
        client=schemas.ClientBrief(name=order.client.name, rating=order.client.rating),
        responses_count=len(order.responses),
        created_at=order.created_at,
    )


@router.post("/", response_model=schemas.OrderOut)
def create_order(
    body: schemas.OrderCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    order = models.Order(
        title=body.title,
        description=body.description,
        service_type=body.service_type,
        budget=body.budget,
        address=body.address,
        city=body.city,
        date=body.date,
        time=body.time,
        urgent=body.urgent,
        details_json=body.details_json,
        client_id=current_user.id,
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return _order_to_out(order)


@router.get("/", response_model=list[schemas.OrderOut])
def list_orders(
    city: Optional[str] = Query(None),
    service_type: Optional[str] = Query(None),
    price_min: Optional[float] = Query(None),
    price_max: Optional[float] = Query(None),
    date: Optional[str] = Query(None),
    urgent: Optional[bool] = Query(None),
    db: Session = Depends(get_db),
):
    q = db.query(models.Order).filter(models.Order.status == "active")

    if city and city != "Все города":
        q = q.filter(models.Order.city == city)
    if service_type and service_type != "all":
        q = q.filter(models.Order.service_type == service_type)
    if price_min is not None:
        q = q.filter(models.Order.budget >= price_min)
    if price_max is not None:
        q = q.filter(models.Order.budget <= price_max)
    if date:
        q = q.filter(models.Order.date == date)
    if urgent is not None:
        q = q.filter(models.Order.urgent == urgent)

    orders = q.order_by(models.Order.created_at.desc()).all()
    return [_order_to_out(o) for o in orders]


@router.get("/{order_id}", response_model=schemas.OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Заказ не найден")
    return _order_to_out(order)


@router.patch("/{order_id}", response_model=schemas.OrderOut)
def update_order(
    order_id: int,
    body: schemas.OrderUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Заказ не найден")
    if order.client_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Нет доступа")

    if body.status:
        order.status = body.status
    if body.performer_id:
        order.performer_id = body.performer_id

    db.commit()
    db.refresh(order)
    return _order_to_out(order)


@router.post("/{order_id}/respond", response_model=schemas.ResponseOut)
def respond_to_order(
    order_id: int,
    body: schemas.ResponseCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != "performer":
        raise HTTPException(status_code=403, detail="Только исполнители могут откликаться")

    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Заказ не найден")

    existing = (
        db.query(models.OrderResponse)
        .filter(
            models.OrderResponse.order_id == order_id,
            models.OrderResponse.performer_id == current_user.id,
        )
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="Вы уже откликались на этот заказ")

    resp = models.OrderResponse(
        order_id=order_id,
        performer_id=current_user.id,
        message=body.message,
        price=body.price,
    )
    db.add(resp)
    db.commit()
    db.refresh(resp)

    return schemas.ResponseOut(
        id=resp.id,
        order_id=resp.order_id,
        performer_id=resp.performer_id,
        performer_name=current_user.name,
        performer_rating=current_user.rating,
        message=resp.message,
        price=resp.price,
        created_at=resp.created_at,
    )


@router.get("/{order_id}/responses", response_model=list[schemas.ResponseOut])
def list_responses(order_id: int, db: Session = Depends(get_db)):
    resps = (
        db.query(models.OrderResponse)
        .filter(models.OrderResponse.order_id == order_id)
        .order_by(models.OrderResponse.created_at.desc())
        .all()
    )
    result = []
    for r in resps:
        performer = db.query(models.User).filter(models.User.id == r.performer_id).first()
        result.append(schemas.ResponseOut(
            id=r.id,
            order_id=r.order_id,
            performer_id=r.performer_id,
            performer_name=performer.name if performer else "",
            performer_rating=performer.rating if performer else 0.0,
            message=r.message,
            price=r.price,
            created_at=r.created_at,
        ))
    return result
