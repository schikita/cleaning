"""Auth router - login for frontend NextAuth."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.security import create_access_token, verify_password
from app.deps import get_db
from app.models.user import User
from app.schemas.user import LoginRequest, LoginResponse, Token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=LoginResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    """Verify credentials and return user + token."""
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not user.password_hash:
        raise HTTPException(status_code=401, detail="Password not set for this user")
    if not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user.id})
    return {
        "token": Token(access_token=access_token, token_type="bearer"),
        "user": user
    }
