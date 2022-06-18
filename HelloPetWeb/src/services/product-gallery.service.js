import http from "../http-common";
import authHeader from "./auth-header";

class ProductGalleryService {
  getAll() {
    return http.get("/productGalleries/", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/productGalleries/${id}`, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/productGalleries/${id}`, { headers: authHeader() });
  }
}

export default new ProductGalleryService();
