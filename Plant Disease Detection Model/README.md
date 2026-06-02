# 🌿 Plant Leaf Disease Detection & Recommendation System

## Project Overview

Build a production-ready full-stack web application that detects plant leaf diseases using a pre-trained TensorFlow/Keras `.h5` model and provides disease-specific recommendations without using any external APIs.

The system should allow users to upload an image of a plant leaf, predict the disease using the trained model, and display detailed information including disease description, causes, symptoms, prevention methods, and treatment recommendations.

The recommendation system must be completely local and database/file-driven.

---

# Technology Stack

## Frontend

* React.js
* Vite
* Axios
* React Router DOM
* Tailwind CSS
* **React Query (TanStack Query)**

## Backend

* FastAPI
* TensorFlow / Keras
* Pillow (PIL)
* NumPy
* Pydantic
* Uvicorn

---

# Functional Requirements

## 1. Disease Detection Module

### User Flow

1. User uploads a leaf image.
2. Image is sent to FastAPI backend.
3. Backend preprocesses image.
4. TensorFlow model performs inference.
5. Predicted disease and confidence score are returned.
6. Recommendation engine retrieves disease information.
7. Frontend displays complete analysis.

---

## 2. Recommendation Engine

### Important Requirement

Do NOT use:

* OpenAI API
* Gemini API
* Claude API
* LangChain
* Any external disease API

All recommendations must be stored locally.

Recommended storage:

```text
backend/app/data/disease_info.json
```

Each disease should contain:

```json
{
  "name": "",
  "plant": "",
  "disease_type": "",
  "description": "",
  "symptoms": [],
  "causes": [],
  "treatments": [],
  "prevention": [],
  "severity": ""
}
```

---

# Model Information

The trained model file:

```text
backend/app/models/best_model.h5
```

The model predicts 38 classes.

## Class Mapping

```python
CLASS_NAMES = {
    0: "Apple___Apple_scab",
    1: "Apple___Black_rot",
    2: "Apple___Cedar_apple_rust",
    3: "Apple___healthy",
    4: "Blueberry___healthy",
    5: "Cherry_(including_sour)___Powdery_mildew",
    6: "Cherry_(including_sour)___healthy",
    7: "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    8: "Corn_(maize)___Common_rust_",
    9: "Corn_(maize)___Northern_Leaf_Blight",
    10: "Corn_(maize)___healthy",
    11: "Grape___Black_rot",
    12: "Grape___Esca_(Black_Measles)",
    13: "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    14: "Grape___healthy",
    15: "Orange___Haunglongbing_(Citrus_greening)",
    16: "Peach___Bacterial_spot",
    17: "Peach___healthy",
    18: "Pepper,_bell___Bacterial_spot",
    19: "Pepper,_bell___healthy",
    20: "Potato___Early_blight",
    21: "Potato___Late_blight",
    22: "Potato___healthy",
    23: "Raspberry___healthy",
    24: "Soybean___healthy",
    25: "Squash___Powdery_mildew",
    26: "Strawberry___Leaf_scorch",
    27: "Strawberry___healthy",
    28: "Tomato___Bacterial_spot",
    29: "Tomato___Early_blight",
    30: "Tomato___Late_blight",
    31: "Tomato___Leaf_Mold",
    32: "Tomato___Septoria_leaf_spot",
    33: "Tomato___Spider_mites Two-spotted_spider_mite",
    34: "Tomato___Target_Spot",
    35: "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    36: "Tomato___Tomato_mosaic_virus",
    37: "Tomato___healthy"
}
```

---

# Application Architecture

```text
Frontend (React)
        │
        ▼
FastAPI API Layer
        │
 ┌──────┼──────────┐
 │      │          │
 ▼      ▼          ▼

Prediction Service
Recommendation Service
Image Processing Service

        │
        ▼

TensorFlow .h5 Model
```

---

# Project Structure

```text
plant-disease-detection/
│
├── frontend/
│
│   ├── public/
│
│   ├── src/
│   │
│   ├── api/
│   │   ├── predictionApi.js
│   │   └── recommendationApi.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ImageUploader.jsx
│   │   ├── PredictionResult.jsx
│   │   ├── DiseaseInfoCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorAlert.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── About.jsx
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
│
│
├── backend/
│
│   ├── app/
│   │
│   ├── api/
│   │   └── v1/
│   │       ├── predict.py
│   │       ├── recommendation.py
│   │       └── health.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   └── constants.py
│   │
│   ├── services/
│   │   ├── model_service.py
│   │   ├── image_service.py
│   │   └── recommendation_service.py
│   │
│   ├── schemas/
│   │   ├── prediction_schema.py
│   │   └── recommendation_schema.py
│   │
│   ├── models/
│   │   └── best_model.h5
│   │
│   ├── data/
│   │   └── disease_info.json
│   │
│   └── main.py
│
│
├── requirements.txt
├── .env
├── .gitignore
└── README.md
```

---

# Backend Requirements

## FastAPI Endpoints

### Health Check

```http
GET /api/v1/health
```

Response:

```json
{
  "status": "healthy"
}
```

---

### Predict Disease

```http
POST /api/v1/predict
```

Input:

```form-data
image: file
```

Response:

```json
{
  "predicted_class": "Tomato___Late_blight",
  "confidence": 98.45
}
```

---

### Get Disease Information

```http
GET /api/v1/recommendation/{disease_name}
```

Example:

```http
GET /api/v1/recommendation/Tomato___Late_blight
```

Response:

```json
{
  "name": "Tomato Late Blight",
  "plant": "Tomato",
  "description": "...",
  "symptoms": [],
  "causes": [],
  "treatments": [],
  "prevention": [],
  "severity": "High"
}
```

---

### Complete Analysis

Single endpoint for frontend consumption.

```http
POST /api/v1/analyze
```

Workflow:

1. Upload image
2. Predict disease
3. Retrieve recommendation
4. Return combined response

Response:

```json
{
  "predicted_class": "Tomato___Late_blight",
  "confidence": 98.45,
  "disease_info": {
    "description": "...",
    "symptoms": [],
    "causes": [],
    "treatments": [],
    "prevention": [],
    "severity": "High"
  }
}
```

---

# Image Processing Requirements

Before prediction:

1. Validate file type.
2. Validate image size.
3. Convert image to RGB.
4. Resize to model input size.
5. Normalize pixel values.
6. Convert to NumPy array.
7. Expand dimensions.
8. Feed into model.

All image processing logic should remain inside:

```text
services/image_service.py
```

---

# Frontend Requirements

## Pages

### Home Page

Contains:

* Hero Section
* Upload Component
* Prediction Result
* Disease Information
* Treatment Recommendations

---

## Upload Component

Features:

* Drag and drop support
* Click upload support
* Image preview
* Validation
* Loading state

---

## Prediction Result Card

Display:

* Disease Name
* Confidence Score
* Plant Name
* Disease Status

---

## Recommendation Section

Display:

### Disease Description

### Symptoms

### Causes

### Treatment

### Prevention

### Severity

---

# UI Design Requirements

Theme:

* Agriculture-focused
* Clean
* Modern
* Responsive

Colors:

```css
Primary: #2E7D32
Secondary: #4CAF50
Background: #F8FFF8
Text: #1B1B1B
```

---

# Error Handling

Backend should handle:

* Invalid image format
* Empty uploads
* Corrupted image
* Model inference errors
* Missing disease information

Frontend should show user-friendly messages.

---

# Scalability Requirements

Must follow Service Layer Architecture.

Business logic must never be placed directly inside route files.

### Route Layer

Responsible for:

* Request handling
* Validation
* Response generation

### Service Layer

Responsible for:

* Prediction
* Image processing
* Recommendation retrieval

### Data Layer

Responsible for:

* Disease information loading
* Future database integration

---

# Non-Functional Requirements

* Clean architecture
* Modular code
* Reusable components
* Type-safe API responses
* Production-ready folder structure
* Proper logging
* Environment variable support
* API versioning support

---

# Future Enhancements

* Prediction history
* User authentication
* Admin dashboard
* Disease analytics
* Multiple image uploads
* Model versioning
* Mobile application
* PWA support

---

# Expected Final Output

The completed application should:

1. Accept a leaf image.
2. Predict one of the 38 disease classes.
3. Display confidence score.
4. Show disease information.
5. Show treatment recommendations.
6. Show prevention methods.
7. Work entirely offline except for frontend-backend communication.
8. Follow scalable React + FastAPI architecture suitable for production deployment.