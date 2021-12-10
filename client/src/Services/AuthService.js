import http from "./http-common";

class AuthService {
  singin(data) {
    return http.post("/login", data);
  }
}

export default new AuthService();
