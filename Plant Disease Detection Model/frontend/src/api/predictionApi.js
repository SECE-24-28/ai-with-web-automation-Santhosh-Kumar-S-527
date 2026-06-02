import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const predictDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  
  const response = await apiClient.post("/predict", formData);
  return response.data;
};

export const analyzeDisease = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  
  const response = await apiClient.post("/analyze", formData);
  return response.data;
};
