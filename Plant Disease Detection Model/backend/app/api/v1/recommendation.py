from fastapi import APIRouter, Path
from ...schemas.recommendation_schema import DiseaseRecommendationResponse
from ...services.recommendation_service import recommendation_service

router = APIRouter()

@router.get(
    "/recommendation/{disease_name}",
    response_model=DiseaseRecommendationResponse,
    summary="Get disease specific treatment recommendations"
)
async def get_disease_recommendation(
    disease_name: str = Path(..., description="The exact class name predicted by the model (e.g. Tomato___Late_blight)")
):
    recommendation = recommendation_service.get_recommendation(disease_name)
    return recommendation
