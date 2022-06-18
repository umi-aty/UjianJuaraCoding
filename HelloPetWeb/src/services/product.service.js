import http from "../http-common";
import authHeader from "./auth-header";
class ProductService {
  getAll() {
    return http.get("/products/", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/products/${id}`, { headers: authHeader() });
  }

  add(data) {
    return http.post(
      "/products/",
      data,
      { headers: authHeader() },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  delete(id) {
    return http.delete(`/products/${id}`, { headers: authHeader() });
  }
}

export default new ProductService();
