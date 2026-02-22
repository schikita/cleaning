"""Performers router – dashboard, profile."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
import models
import schemas
from auth import get_current_user

router = APIRouter(prefix="/api/performers", tags=["performers"])


@router.get("/dashboard", response_model=schemas.PerformerStatsOut)
def performer_dashboard(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != "performer":
        raise HTTPException(status_code=403, detail="Только для исполнителей")

    profile = (
        db.query(models.PerformerProfile)
        .filter(models.PerformerProfile.user_id == current_user.id)
        .first()
    )
    if not profile:
        raise HTTPException(status_code=404, detail="Профиль не найден")

    return schemas.PerformerStatsOut(
        level=profile.level,
        xp=profile.xp,
        xp_to_next=profile.xp_to_next,
        credits=profile.credits,
        bonus_credits=profile.bonus_credits,
        skills=profile.skills or [],
        badges=profile.badges or [],
    )


@router.get("/profile", response_model=schemas.PerformerProfileOut)
def performer_profile(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != "performer":
        raise HTTPException(status_code=403, detail="Только для исполнителей")

    profile = (
        db.query(models.PerformerProfile)
        .filter(models.PerformerProfile.user_id == current_user.id)
        .first()
    )
    if not profile:
        raise HTTPException(status_code=404, detail="Профиль не найден")

    reviews_db = (
        db.query(models.Review)
        .filter(models.Review.performer_id == current_user.id)
        .order_by(models.Review.created_at.desc())
        .limit(20)
        .all()
    )

    reviews = []
    for r in reviews_db:
        author = db.query(models.User).filter(models.User.id == r.author_id).first()
        reviews.append(schemas.ReviewOut(
            id=r.id,
            author=author.name if author else "Аноним",
            rating=r.rating,
            text=r.text,
            date=r.created_at.strftime("%d %B %Y") if r.created_at else "",
        ))

    return schemas.PerformerProfileOut(
        name=current_user.name,
        rating=current_user.rating,
        reviews_count=len(reviews_db),
        completed_orders=current_user.completed_orders,
        member_since=str(current_user.created_at.year) if current_user.created_at else "",
        level=profile.level,
        city=current_user.city,
        phone=current_user.phone,
        email=current_user.email,
        bio=current_user.bio,
        services=profile.services or [],
        badges=profile.badges or [],
        reviews=reviews,
    )


@router.patch("/profile", response_model=schemas.PerformerProfileOut)
def update_profile(
    body: schemas.ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role != "performer":
        raise HTTPException(status_code=403, detail="Только для исполнителей")

    if body.bio is not None:
        current_user.bio = body.bio
    if body.phone is not None:
        current_user.phone = body.phone
    if body.city is not None:
        current_user.city = body.city

    profile = (
        db.query(models.PerformerProfile)
        .filter(models.PerformerProfile.user_id == current_user.id)
        .first()
    )
    if profile and body.services is not None:
        profile.services = body.services

    db.commit()
    db.refresh(current_user)

    # Reuse GET profile logic
    return performer_profile(db=db, current_user=current_user)
