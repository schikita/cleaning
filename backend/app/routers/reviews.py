"""Reviews router."""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload

from app.deps import get_db
from app.models.review import Review
from app.schemas.review import ReviewCreate, ReviewResponse, ReviewWithAuthorResponse

router = APIRouter(prefix="/reviews", tags=["Reviews"])


def _short_name(name: str | None) -> str:
    """Convert 'Анна Петрова' -> 'Анна П.'."""
    if not name or not name.strip():
        return "Аноним"
    parts = name.strip().split()
    if len(parts) == 1:
        return parts[0]
    return f"{parts[0]} {parts[-1][0]}."


@router.get("", response_model=list[ReviewWithAuthorResponse])
def list_reviews(
    performer_id: str | None = Query(None, description="Filter by performer"),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """List reviews, optionally filtered by performer."""
    q = db.query(Review).options(joinedload(Review.client))
    if performer_id:
        q = q.filter(Review.performer_id == performer_id)
    reviews = q.order_by(Review.created_at.desc()).limit(limit).all()
    result = []
    for r in reviews:
        author = _short_name(r.client.name) if r.client else "Аноним"
        result.append(ReviewWithAuthorResponse(
            id=r.id, order_id=r.order_id, performer_id=r.performer_id, client_id=r.client_id,
            rating=r.rating, text=r.text, created_at=r.created_at, author=author,
        ))
    return result


@router.post("", response_model=ReviewResponse)
def create_review(review_in: ReviewCreate, db: Session = Depends(get_db)):
    """Create a review (e.g. after order completion)."""
    review = Review(**review_in.model_dump())
    db.add(review)
    db.commit()
    db.refresh(review)
    return review
