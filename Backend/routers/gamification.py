"""Gamification router – stats, chest opening."""

import random
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
import models
import schemas
from auth import get_current_user

router = APIRouter(prefix="/api/gamification", tags=["gamification"])


@router.get("/stats", response_model=schemas.PerformerStatsOut)
def get_stats(
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


@router.post("/chest/open", response_model=schemas.ChestResult)
def open_chest(
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

    # Check 24h cooldown
    now = datetime.now(timezone.utc)
    if profile.last_chest_opened:
        last = profile.last_chest_opened
        if last.tzinfo is None:
            last = last.replace(tzinfo=timezone.utc)
        if now - last < timedelta(hours=24):
            remaining = timedelta(hours=24) - (now - last)
            hours = int(remaining.total_seconds() // 3600)
            raise HTTPException(
                status_code=400,
                detail=f"Сундук будет доступен через {hours} ч.",
            )

    # Random reward: 1-10 credits
    amount = random.randint(1, 10)
    profile.credits += amount
    profile.last_chest_opened = now

    # Bonus XP for opening chest
    profile.xp += 10
    _check_level_up(profile)

    db.commit()

    return schemas.ChestResult(reward_type="credits", amount=amount)


def _check_level_up(profile: models.PerformerProfile):
    """Auto-level-up if XP threshold reached."""
    levels = [
        ("new", 0, 500),
        ("bronze", 500, 1000),
        ("silver", 1000, 2000),
        ("gold", 2000, 3000),
        ("platinum", 3000, 99999),
    ]
    for name, low, high in levels:
        if low <= profile.xp < high:
            profile.level = name
            profile.xp_to_next = high
            break
