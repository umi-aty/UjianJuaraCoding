import axios from "axios";
import http from "../http-common";

import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  // Service CRUD User
  getAll() {
    return http.get("/users/", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/users/${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/users/${id}`, data, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
