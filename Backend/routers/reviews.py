"""Reviews router."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import get_db
import models
import schemas
from auth import get_current_user

router = APIRouter(prefix="/api/reviews", tags=["reviews"])


@router.post("/", response_model=schemas.ReviewOut)
def create_review(
    body: schemas.ReviewCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # Validate order exists and is completed
    order = db.query(models.Order).filter(models.Order.id == body.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Заказ не найден")
    if order.status != "completed":
        raise HTTPException(status_code=400, detail="Отзыв можно оставить только для завершённого заказа")

    # Check rating range
    if body.rating < 1 or body.rating > 5:
        raise HTTPException(status_code=400, detail="Рейтинг должен быть от 1 до 5")

    review = models.Review(
        order_id=body.order_id,
        author_id=current_user.id,
        performer_id=body.performer_id,
        rating=body.rating,
        text=body.text,
    )
    db.add(review)
    db.commit()
    db.refresh(review)

    # Update performer average rating
    avg = (
        db.query(func.avg(models.Review.rating))
        .filter(models.Review.performer_id == body.performer_id)
        .scalar()
    )
    performer = db.query(models.User).filter(models.User.id == body.performer_id).first()
    if performer and avg:
        performer.rating = round(float(avg), 1)
        db.commit()

    return schemas.ReviewOut(
        id=review.id,
        author=current_user.name,
        rating=review.rating,
        text=review.text,
        date=review.created_at.strftime("%d %B %Y") if review.created_at else "",
    )


@router.get("/performer/{performer_id}", response_model=list[schemas.ReviewOut])
def get_performer_reviews(performer_id: int, db: Session = Depends(get_db)):
    reviews = (
        db.query(models.Review)
        .filter(models.Review.performer_id == performer_id)
        .order_by(models.Review.created_at.desc())
        .all()
    )
    result = []
    for r in reviews:
        author = db.query(models.User).filter(models.User.id == r.author_id).first()
        result.append(schemas.ReviewOut(
            id=r.id,
            author=author.name if author else "Аноним",
            rating=r.rating,
            text=r.text,
            date=r.created_at.strftime("%d %B %Y") if r.created_at else "",
        ))
    return result
