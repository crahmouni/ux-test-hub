import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

const profile = () => http.get("/users/me");

const register = (user) => http.post("/users", user);

const login = (user) => http.post("/sessions", user);

const getPrototype = (id) => http.get(`/prototypes/${encodeURIComponent(id)}`);

const getPrototypes = () => http.get(`/prototypes`);

const deletePrototype = (id) => http.delete(`/prototypes/${encodeURIComponent(id)}`);

export { login, getPrototype, deletePrototype, register, profile, getPrototypes };
