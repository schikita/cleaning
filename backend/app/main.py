"""FastAPI application entry point."""
from contextlib import asynccontextmanager

from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.openapi.docs import get_swagger_ui_html

from app.config import get_settings
from app.database import engine, Base
from app.routers import auth, favicon, health, orders, reviews, users


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create tables and run migrations on startup."""
    import app.models  # noqa: F401 - register models before create_all
    Base.metadata.create_all(bind=engine)
    # Миграции для существующих БД (добавление колонок при необходимости)
    from sqlalchemy import text
    with engine.connect() as conn:
        conn.execute(text("""
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns
                    WHERE table_name='users' AND column_name='password_hash'
                ) THEN
                    ALTER TABLE users ADD COLUMN password_hash VARCHAR(255);
                END IF;
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns
                    WHERE table_name='orders' AND column_name='performer_id'
                ) THEN
                    ALTER TABLE orders ADD COLUMN performer_id VARCHAR(36) REFERENCES users(id);
                END IF;
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns
                    WHERE table_name='users' AND column_name='phone'
                ) THEN
                    ALTER TABLE users ADD COLUMN phone VARCHAR(50);
                    ALTER TABLE users ADD COLUMN city VARCHAR(100);
                    ALTER TABLE users ADD COLUMN bio TEXT;
                    ALTER TABLE users ADD COLUMN services JSONB;
                    ALTER TABLE users ADD COLUMN badges JSONB;
                END IF;
            END $$;
        """))
        conn.commit()
    yield


settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    lifespan=lifespan,
    docs_url=None,  # Disable default docs
    redoc_url=None,
)


@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url or "/openapi.json",
        title=app.title + " - Swagger UI",
        oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url,
        swagger_js_url="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js",
        swagger_css_url="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css",
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for avatars
avatars_dir = Path(settings.AVATARS_DIR)
avatars_dir.mkdir(parents=True, exist_ok=True)
app.mount("/static/avatars", StaticFiles(directory=str(avatars_dir)), name="avatars")

# Favicon (загрузка через Swagger → отдача по /static/favicon/...)
favicon_dir = Path(settings.FAVICON_DIR)
favicon_dir.mkdir(parents=True, exist_ok=True)
app.mount("/static/favicon", StaticFiles(directory=str(favicon_dir)), name="favicon")

app.include_router(health.router)
app.include_router(auth.router, prefix=settings.API_V1_PREFIX)
app.include_router(users.router, prefix=settings.API_V1_PREFIX)
app.include_router(orders.router, prefix=settings.API_V1_PREFIX)
app.include_router(reviews.router, prefix=settings.API_V1_PREFIX)
app.include_router(favicon.router, prefix=settings.API_V1_PREFIX)


@app.get("/")
def root():
    """Root endpoint."""
    return {"message": "Cleaning Marketplace API", "docs": "/docs"}
