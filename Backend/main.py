"""ProЧисто – FastAPI backend entry-point."""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import redis
from config import ALLOWED_ORIGINS, REDIS_URL
from database import engine, Base
from routers import auth, orders, performers, clients, reviews, gamification


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    Base.metadata.create_all(bind=engine)
    
    # Initialize Redis connection
    app.state.redis = redis.from_url(REDIS_URL, decode_responses=True)
    try:
        app.state.redis.ping()
        print("✅ Redis connection successful!")
    except Exception as e:
        print(f"❌ Redis connection failed: {e}")
        
    yield
    # Close Redis connection on shutdown
    app.state.redis.close()


app = FastAPI(
    title="ProЧисто API",
    description="Backend API for ProЧисто cleaning marketplace",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(orders.router)
app.include_router(performers.router)
app.include_router(clients.router)
app.include_router(reviews.router)
app.include_router(gamification.router)


@app.get("/")
def root():
    return {"message": "ProЧисто API работает!", "docs": "/docs"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
