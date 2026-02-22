"""Clients router – dashboard."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import get_db
import models
import schemas
from auth import get_current_user

router = APIRouter(prefix="/api/clients", tags=["clients"])


@router.get("/dashboard", response_model=schemas.ClientDashboard)
def client_dashboard(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role not in ("client", "admin"):
        raise HTTPException(status_code=403, detail="Только для клиентов")

    all_orders = (
        db.query(models.Order)
        .filter(models.Order.client_id == current_user.id)
        .order_by(models.Order.created_at.desc())
        .all()
    )

    total = len(all_orders)
    active = sum(1 for o in all_orders if o.status in ("active", "in_progress"))
    completed = sum(1 for o in all_orders if o.status == "completed")
    total_spent = sum(o.budget or 0 for o in all_orders if o.status == "completed")

    orders_out = []
    for o in all_orders:
        orders_out.append(schemas.OrderOut(
            id=o.id,
            title=o.title,
            description=o.description,
            service_type=o.service_type,
            category=o.category,
            budget=o.budget,
            address=o.address,
            city=o.city,
            date=o.date,
            time=o.time,
            status=o.status,
            urgent=o.urgent,
            client=schemas.ClientBrief(name=current_user.name, rating=current_user.rating),
            responses_count=len(o.responses),
            created_at=o.created_at,
        ))

    return schemas.ClientDashboard(
        total_orders=total,
        active_orders=active,
        completed_orders=completed,
        total_spent=total_spent,
        orders=orders_out,
    )
