import http from "./http-common";
import { UserCtx } from "../Context/GlobalContext.js";
import { useContext } from "react";
export { UserCtx };

const GetUser = () => {
  const [user, setUser] = useContext(UserCtx);
  return user;
};

class UserService {
  getUser() {
    return GetUser();
  }
  getType() {
    return GetUser().type;
  }
  getTypeString() {
    switch (GetUser().type) {
      case 0:
        return "Guest";
      case 1:
        return "User";
      case 2:
        return "Admin";
      default:
        return "Error";
    }
  }
  isGuest() {
    return GetUser().type === 0;
  }

  isUser() {
    return GetUser().type === 1;
  }
  isAdmin() {
    return GetUser().type === 2;
  }
  isLoggedIn() {
    return GetUser().type !== 0;
  }
}

export default new UserService();
