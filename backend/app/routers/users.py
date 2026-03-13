"""Users router."""
import os
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.security import hash_password
from app.config import get_settings
from app.deps import get_db, get_current_user
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserSetPassword, UserUpdate, UserPublic

router = APIRouter(prefix="/users", tags=["Users"])
ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


@router.get("", response_model=list[UserPublic])
def list_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """List all users (public profile)."""
    users = db.query(User).offset(skip).limit(limit).all()
    return users


@router.post("", response_model=UserResponse)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    """Create a new user (Signup)."""
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    try:
        password_hash = hash_password(user_in.password) if user_in.password else None
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Password hashing failed: {str(e)}")
    user = User(
        name=user_in.name,
        email=user_in.email,
        avatar=user_in.avatar,
        role=user_in.role,
        password_hash=password_hash,
    )
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    return user


@router.get("/{user_id}", response_model=UserPublic)
def get_user(user_id: str, db: Session = Depends(get_db)):
    """Get user by ID (public profile)."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.patch("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: str,
    user_in: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update user (requires authentication)."""
    if current_user.id != user_id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in user_in.model_dump(exclude_unset=True).items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user


@router.post("/{user_id}/avatar", response_model=UserResponse)
def upload_avatar(
    user_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Upload avatar for user (requires authentication)."""
    if current_user.id != user_id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    ext = Path(file.filename or "img.jpg").suffix.lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail="Allowed: jpg, png, webp, gif")

    settings = get_settings()
    avatars_dir = Path(settings.AVATARS_DIR)
    avatars_dir.mkdir(parents=True, exist_ok=True)

    fn = f"{user_id}{ext}"
    path = avatars_dir / fn
    try:
        contents = file.file.read()
        path.write_bytes(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    avatar_url = f"{settings.API_BASE_URL.rstrip('/')}/static/avatars/{fn}"
    user.avatar = avatar_url
    db.commit()
    db.refresh(user)
    return user


@router.post("/{user_id}/set-password", response_model=UserResponse)
def set_password(
    user_id: str,
    body: UserSetPassword,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Set password for existing user (requires authentication)."""
    if current_user.id != user_id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.password_hash = hash_password(body.password)
    db.commit()
    db.refresh(user)
    return user


@router.delete("/{user_id}", status_code=204)
def delete_user(
    user_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete user (requires authentication)."""
    if current_user.id != user_id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return None
