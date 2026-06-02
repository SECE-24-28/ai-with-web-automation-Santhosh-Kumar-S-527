import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getRecommendation = async (diseaseName) => {
  const encodedName = encodeURIComponent(diseaseName);
  const response = await apiClient.get(`/recommendation/${encodedName}`);
  return response.data;
};
