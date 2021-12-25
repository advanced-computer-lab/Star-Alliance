import axios from "axios";
var url = "not set";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8080";
} else {
  url = "";
}

const axInstance = axios.create({
  baseURL: url,
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
