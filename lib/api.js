import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ⭐ Add token to every request automatically
api.interceptors.request.use((config) => {
  const saved = localStorage.getItem("user");

  if (saved) {
    const user = JSON.parse(saved);
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }

  return config;
});

export default api;
