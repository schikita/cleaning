"""Admin router – moderation and platform statistics."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import get_db
import models
import schemas
from auth import get_current_user

router = APIRouter(prefix="/api/admin", tags=["admin"])

def check_admin(user: models.User):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied. Admin only.")

@router.get("/stats", response_model=schemas.AdminStatsOut)
def get_platform_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    check_admin(current_user)

    total_users = db.query(models.User).count()
    active_orders = db.query(models.Order).filter(models.Order.status == "active").count()
    completed_orders = db.query(models.Order).filter(models.Order.status == "completed").count()

    return schemas.AdminStatsOut(
        total_users=total_users,
        active_orders=active_orders,
        completed_orders=completed_orders,
    )

@router.get("/users", response_model=list[schemas.UserOut])
def list_all_users(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    check_admin(current_user)
    users = db.query(models.User).order_by(models.User.created_at.desc()).all()
    return users

@router.patch("/users/{user_id}/ban", response_model=schemas.UserOut)
def toggle_ban_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    check_admin(current_user)
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    # Prevent banning other admins
    if user.role == "admin":
        raise HTTPException(status_code=403, detail="Cannot ban another admin")

    # Simple toggle logic for ban. Using bio field temporarily if an explicitly is_banned field doesn't exist
    if user.bio == "BANNED":
        user.bio = "" # Unban
    else:
        user.bio = "BANNED"
        
    db.commit()
    db.refresh(user)
    return user
