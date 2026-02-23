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

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./app.db"
    )

    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # Avatar storage
    AVATARS_DIR: str = os.getenv("AVATARS_DIR", "/app/data/avatars")
    API_BASE_URL: str = os.getenv("API_BASE_URL", "http://localhost:8000")

    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    if origins := os.getenv("CORS_ORIGINS"):
        CORS_ORIGINS = [o.strip() for o in origins.split(",")]
