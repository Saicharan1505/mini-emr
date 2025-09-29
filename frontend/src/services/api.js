import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-emr-wyzm.onrender.com", // backend URL
});

// Attach token automatically if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
