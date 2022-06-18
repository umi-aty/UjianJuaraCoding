import http from "../http-common";
import authHeader from "./auth-header";

class DoctorService {
  getAll() {
    return http.get("/doctors/", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/doctors/${id}`, { headers: authHeader() });
  }

  add(data) {
    return http.post("/doctors/", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/doctors/${id}`, data, {
      headers: authHeader(),
    });
  }

  delete(id) {
    return http.delete(`/doctors/${id}`, { headers: authHeader() });
  }
}

export default new DoctorService();
