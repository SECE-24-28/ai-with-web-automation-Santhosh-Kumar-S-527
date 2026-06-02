import os
from pathlib import Path
from pydantic_settings import BaseSettings
from pydantic import field_validator
from typing import List, Union
import json

# Determine absolute paths based on the location of THIS file
# This file lives at: backend/app/core/config.py
# So 3 parents up = backend/  (the CWD when running uvicorn)
_BACKEND_DIR = Path(__file__).resolve().parent.parent.parent  # e:\Model\backend
_PROJECT_ROOT = _BACKEND_DIR.parent  # e:\Model

class Settings(BaseSettings):
    PROJECT_NAME: str = "Plant Leaf Disease Detection & Recommendation API"
    API_V1_STR: str = "/api/v1"

    # Paths – defaults are absolute, computed from the project layout
    MODEL_PATH: str = str(_BACKEND_DIR / "app" / "models" / "best_model.h5")
    DISEASE_INFO_PATH: str = str(_BACKEND_DIR / "app" / "data" / "disease_info.json")

    # Server settings
    HOST: str = "127.0.0.1"
    PORT: int = 8000

    # CORS Origins
    CORS_ORIGINS: Union[str, List[str]] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]

    @field_validator("MODEL_PATH", "DISEASE_INFO_PATH", mode="before")
    @classmethod
    def make_paths_absolute(cls, v: str) -> str:
        if not v:
            return v
        p = Path(v)
        if not p.is_absolute():
            # Resolve relative to the project root
            return str((_PROJECT_ROOT / p).resolve())
        return str(p.resolve())

    @property
    def get_cors_origins(self) -> List[str]:
        if isinstance(self.CORS_ORIGINS, str):
            try:
                parsed = json.loads(self.CORS_ORIGINS)
                if isinstance(parsed, list):
                    return parsed
            except Exception:
                pass
            return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]
        return self.CORS_ORIGINS

    class Config:
        # Look for .env in the project root (one level above backend/)
        env_file = str(_PROJECT_ROOT / ".env")
        case_sensitive = True
        extra = "ignore"

settings = Settings()
