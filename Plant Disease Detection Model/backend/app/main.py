import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .api.v1 import health, predict, recommendation

# Configure standard logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler()],
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup / shutdown lifecycle."""
    logger.info("Initializing services on startup...")
    try:
        from .services.model_service import model_service

        _ = model_service.model  # trigger lazy-load
        logger.info("Startup complete: model pre-loaded successfully!")
    except Exception as e:
        logger.error(f"Startup error pre-loading model: {e}")
    yield
    logger.info("Shutting down...")


# Initialize FastAPI App
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Full-stack AI-driven plant disease diagnostics and remediation recommendations system.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Enable CORS
cors_origins = settings.get_cors_origins
logger.info(f"Configuring CORS with origins: {cors_origins}")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(health.router, prefix=settings.API_V1_STR, tags=["System Health"])
app.include_router(predict.router, prefix=settings.API_V1_STR, tags=["Disease Prediction"])
app.include_router(recommendation.router, prefix=settings.API_V1_STR, tags=["Recommendations"])


@app.get("/", summary="Root Index Endpoint", tags=["System Health"])
async def root():
    return {
        "message": "Welcome to the Plant Leaf Disease Detection & Recommendation API!",
        "version": "1.0.0",
        "documentation": "/docs",
    }
