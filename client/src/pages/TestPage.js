// THIS is Just A Test Page, And Will be removed Later
import { React, useState, useRef, useContext } from "react";
import Alert from "../Components/Alert.js";
import PopupView from "../Components/PopupView.js";
import Button from "react-bootstrap/Button";
import UpdateForm from "../Components/UpdateForm.js";
import ImgCard from "../Components/ImgCard.js";
import { UserCtx } from "../Context/GlobalContext.js";
import { Link } from "react-router-dom";
import UserService from "../Services/UserService.js";
import PlaneSelection from "../Components/PlanSelection.js";
import Cookies from "js-cookies";
import AuthService from "../Services/AuthService.js";

import http from "../Services/http-common.js";

function isTokenExpired(token) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}

const TestPage = () => {
  const [User, setUser] = useContext(UserCtx);

  console.log("Access Token : ");
  console.log(Cookies.getItem("accessToken"));
  console.log("Refresh Token : ");
  console.log(Cookies.getItem("refreshToken"));
  console.log("expired : ");
  // console.log(isTokenExpired(Cookies.getItem("accessToken")));

  const handleChangeContexct = () => {
    setUser("ceecec");
  };

  const handleBtnClick = () => {
    // login
    AuthService.singin({
      username: "user",
      password: "user",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBtnClick3 = () => {
    // login
    AuthService.singin({
      username: "admin",
      password: "admin",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBtnClick1 = () => {
    // get a resource
    http
      .get("http://localhost:8080/protected")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBtnClick2 = () => {
    // get a resource
    http
      .get("http://localhost:8080/protected")
      .then((res) => {
        console.log("protected reqest res =", res);
      })
      .catch((err) => {
        console.log("protected reqest err =", err);

        // console.log(err);
      });
  };

  const handleBtnClick4 = () => {
    AuthService.logout()
      .then((res) => {
        console.log("logout res = ", res);
      })
      .catch((err) => {
        console.log("logout res =", err);
      });
  };
  const handleTestRequest = () => {
    UserService.testUser()
      .then((res) => {
        console.log("testuser res = ", res);
      })
      .catch((err) => {
        console.log("testuser res =", err);
      });
  };

  console.log(UserService.getTypeString());
  return (
    <>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <h1>Test Page</h1>
      <Button onClick={handleBtnClick}> login </Button>
      <Button onClick={handleBtnClick3}> loginAdmin </Button>
      <Button onClick={handleBtnClick1}> normal request </Button>
      <Button onClick={handleBtnClick2}> protected request </Button>
      <Button onClick={handleBtnClick4}> LogOut </Button>
      <label>
        Token Exired :{" "}
        {/* {JSON.stringify(isTokenExpired(Cookies.getItem("accessToken")))} */}
      </label>
      <label>{Cookies.getItem("accessToken")}</label>
      <label>{Cookies.getItem("refreshToken")}</label>

      <Button onClick={handleChangeContexct}>change init</Button>
      <Button onClick={handleTestRequest}>send test request</Button>
      <Link to="/">nav to home</Link>
      <Button onClick={() => UserService.SetUser({ type: 1 })}>
        changeType
      </Button>
      <h1>{"user = " + JSON.stringify(User)}</h1>
    </>
  );
};

export default TestPage;
