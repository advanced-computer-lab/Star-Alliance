import axios from "axios";

const axInstance = axios.create({
  baseURL: "http://localhost:2000/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

class AuthService {
  singin(data) {
    return axInstance.post("/login", data);
  }

  logout() {
    return axInstance.delete("/logout");
  }
}

export default new AuthService();
