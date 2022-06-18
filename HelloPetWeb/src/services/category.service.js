import http from "../http-common";
import authHeader from "./auth-header";

class CategoryService {
  getAll() {
    return http.get("/categories/", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/categories/${id}`, { headers: authHeader() });
  }

  add(data) {
    return http.post("/categories/", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/categories/${id}`, data, {
      headers: authHeader(),
    });
  }

  delete(id) {
    return http.delete(`/categories/${id}`, { headers: authHeader() });
  }
}

export default new CategoryService();
