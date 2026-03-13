"""Application configuration."""
import os
from functools import lru_cache


@lru_cache
def get_settings():
    """Load settings from environment."""
    return Settings()


class Settings:
    """App settings."""

    APP_NAME: str = "Cleaning Marketplace API"
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

    # Database (PostgreSQL)
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://cleaning:cleaning_secret@localhost:5434/cleaning_db",
    )

    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # Avatar storage
    AVATARS_DIR: str = os.getenv("AVATARS_DIR", "/app/data/avatars")
    # Favicon (для замены через Swagger /docs)
    FAVICON_DIR: str = os.getenv("FAVICON_DIR", "/app/data/favicon")
    API_BASE_URL: str = os.getenv("API_BASE_URL", "http://localhost:8000")

    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-super-secret-key-change-it-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    if origins := os.getenv("CORS_ORIGINS"):
        CORS_ORIGINS = [o.strip() for o in origins.split(",")]
