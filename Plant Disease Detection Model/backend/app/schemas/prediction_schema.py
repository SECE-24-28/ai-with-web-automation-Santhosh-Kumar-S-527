from pydantic import BaseModel
from .recommendation_schema import DiseaseRecommendationResponse

class PredictionResponse(BaseModel):
    predicted_class: str
    confidence: float

class AnalysisResponse(BaseModel):
    predicted_class: str
    confidence: float
    disease_info: DiseaseRecommendationResponse
