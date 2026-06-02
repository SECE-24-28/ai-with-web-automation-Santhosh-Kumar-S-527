import json
import logging
from typing import Dict, Any, Optional
from fastapi import HTTPException
from ..core.config import settings

logger = logging.getLogger(__name__)

class RecommendationService:
    def __init__(self):
        self._db: Dict[str, Dict[str, Any]] = {}
        self.load_database()

    def load_database(self):
        try:
            with open(settings.DISEASE_INFO_PATH, "r", encoding="utf-8") as f:
                self._db = json.load(f)
            logger.info(f"Successfully loaded disease recommendation database from {settings.DISEASE_INFO_PATH} with {len(self._db)} entries.")
        except Exception as e:
            logger.error(f"Error loading disease database from {settings.DISEASE_INFO_PATH}: {e}")
            self._db = {}

    def get_recommendation(self, disease_name: str) -> Dict[str, Any]:
        # Normalize key checks: check exact match first
        if disease_name in self._db:
            return self._db[disease_name]
        
        # Check normalized match (ignore case and spaces/underscores)
        norm_query = disease_name.lower().replace("_", "").replace(" ", "").replace("-", "")
        for key, value in self._db.items():
            norm_key = key.lower().replace("_", "").replace(" ", "").replace("-", "")
            if norm_key == norm_query:
                return value
                
        # Raise HTTP 404 if not found
        raise HTTPException(
            status_code=404,
            detail=f"Recommendation for disease '{disease_name}' not found."
        )

recommendation_service = RecommendationService()
