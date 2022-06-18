import http from "../http-common";
import authHeader from "./auth-header";

class DashboardService {
  countCategory() {
    return http.get("/countCategory", { headers: authHeader() });
  }

  countProduct() {
    return http.get("/countProduct", { headers: authHeader() });
  }
}

export default new DashboardService();
