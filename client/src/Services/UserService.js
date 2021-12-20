import http from "./http-common";
import { UserCtx } from "../Context/GlobalContext.js";
import { useContext } from "react";
export { UserCtx };

const GetUser = () => {
  const [user, setUser] = useContext(UserCtx);
  return user;
};
const SetUser = (newUser) => {
  const [user, setUser] = useContext(UserCtx);
  setUser(newUser);
};

const getUser = () => GetUser();
const getUserId = () => GetUser().userId;

const getType = () => GetUser().type;

const getTypeString = () => {
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
};
const isGuest = () => GetUser().type === 0;

const isUser = () => GetUser().type === 1;

const isAdmin = () => GetUser().type === 2;

const isLoggedIn = () => GetUser().type !== 0;

const signUp = (data) => {
  return http.post("/signUp", data);
};

export const changePassword = (data) => {
  // TODO: make it for both admin or users
  return http.post("/User/changePassword", data);
};

const UserService = {
  getUser,
  getType,
  getTypeString,
  isGuest,
  isUser,
  isAdmin,
  isLoggedIn,
  SetUser,
  signUp,
  changePassword,
  getUserId,
};
export default UserService;
