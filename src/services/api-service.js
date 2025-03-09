import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  withCredentials: true,
});

// Interceptor para manejar errores comunes
http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Errores de la API (4xx, 5xx)
      console.error("API Error:", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Errores de red (sin respuesta del servidor)
      console.error("Network Error:", error.request);
      return Promise.reject({ message: "Network Error. Please check your connection." });
    } else {
      // Otros errores
      console.error("Error:", error.message);
      return Promise.reject({ message: "An unexpected error occurred." });
    }
  }
);

// Interceptor para actualizar el token de autenticación
http.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const profile = () => http.get("/users/me");
const register = (user) => http.post("/users", user);
const login = (user) => http.post("/sessions", user);
const getPrototype = (id) => http.get(`/prototypes/${encodeURIComponent(id)}`);
const getPrototypes = () => http.get("/prototypes");
const deletePrototype = (id) => http.delete(`/prototypes/${encodeURIComponent(id)}`);

export { login, getPrototype, deletePrototype, register, profile, getPrototypes };