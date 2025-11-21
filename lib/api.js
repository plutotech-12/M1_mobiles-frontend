import axios from "axios";

const api = axios.create({
  baseURL: "https://m1-mobiles-backend.onrender.com/",
});

export default api;
