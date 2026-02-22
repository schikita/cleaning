"""Auth router – register, login, me."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
import models
import schemas
from auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=schemas.UserOut)
def register(body: schemas.UserRegister, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == body.email).first():
        raise HTTPException(status_code=400, detail="Этот email уже зарегистрирован")

    user = models.User(
        name=body.name,
        email=body.email,
        password_hash=hash_password(body.password),
        role=body.role,
        phone=body.phone,
        city=body.city,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # If performer, create their gamification profile
    if body.role == "performer":
        profile = models.PerformerProfile(
            user_id=user.id,
            services=[],
            badges=[],
            skills=[
                {"name": "Скорость", "level": 1, "max": 10, "effect": "+5% к видимости"},
                {"name": "Коммуникация", "level": 1, "max": 10, "effect": "Цветная карточка"},
                {"name": "Экономия", "level": 1, "max": 10, "effect": "5% шанс"},
                {"name": "Качество", "level": 1, "max": 10, "effect": "+0.1 к рейтингу"},
            ],
        )
        db.add(profile)
        db.commit()

    return user


@router.post("/login", response_model=schemas.Token)
def login(body: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == body.email).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Неверный email или пароль")

    token = create_access_token({"sub": user.id})
    return {"access_token": token}


@router.get("/me", response_model=schemas.UserOut)
def me(current_user: models.User = Depends(get_current_user)):
    return current_user
