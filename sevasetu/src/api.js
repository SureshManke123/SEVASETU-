import axios from "axios";

const API = axios.create({
  // Vite proxies /api to the local backend. Set VITE_API_URL when deploying.
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
