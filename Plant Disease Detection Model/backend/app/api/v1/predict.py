from fastapi import APIRouter, File, UploadFile, HTTPException
from ...schemas.prediction_schema import PredictionResponse, AnalysisResponse
from ...services.image_service import image_service
from ...services.model_service import model_service
from ...services.recommendation_service import recommendation_service

router = APIRouter()

@router.post(
    "/predict",
    response_model=PredictionResponse,
    summary="Predict plant disease from leaf image"
)
async def predict_disease(image: UploadFile = File(..., description="Uploaded leaf image file (JPEG, PNG, WebP)")):
    # Process image
    processed_image = await image_service.preprocess_image(image, target_size=model_service.target_size)
    
    # Run model prediction
    predicted_class, confidence = model_service.predict(processed_image)
    
    return {
        "predicted_class": predicted_class,
        "confidence": confidence
    }

@router.post(
    "/analyze",
    response_model=AnalysisResponse,
    summary="Predict plant disease and retrieve treatment recommendations"
)
async def analyze_disease(image: UploadFile = File(..., description="Uploaded leaf image file (JPEG, PNG, WebP)")):
    # 1. Preprocess the image
    processed_image = await image_service.preprocess_image(image, target_size=model_service.target_size)
    
    # 2. Perform the classification model inference
    predicted_class, confidence = model_service.predict(processed_image)
    
    # 3. Retrieve local recommendation information
    try:
        disease_info = recommendation_service.get_recommendation(predicted_class)
    except HTTPException as e:
        # Fallback if specific recommendation database record does not exist
        # (Though we compiled all 38, this ensures extreme production stability)
        disease_info = {
            "name": predicted_class.replace("___", " ").replace("_", " "),
            "plant": predicted_class.split("___")[0].replace("_", " ") if "___" in predicted_class else "Unknown",
            "disease_type": "Unknown",
            "description": "Information not found in the local catalog. Please ensure the crop leaf is clearly visible and retake.",
            "symptoms": ["N/A"],
            "causes": ["N/A"],
            "treatments": ["No treatment available.", "Consult a local agricultural extension service."],
            "prevention": ["N/A"],
            "severity": "Medium"
        }
    
    return {
        "predicted_class": predicted_class,
        "confidence": confidence,
        "disease_info": disease_info
    }
