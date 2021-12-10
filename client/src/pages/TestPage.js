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

import axios from "axios";
import http from "../Services/http-common.js";

function isTokenExpired(token) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
}
// normal resource
const axiosInst = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
// authServer axios
const axiosInst2 = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

axiosInst.interceptors.request.use(
  async (config) => {
    console.log("request interceptor");
    console.log(config);
    if (isTokenExpired(Cookies.getItem("accessToken"))) {
      console.log("token expired trying to refresh");
      await axiosInst2
        .post("http://localhost:2000/getaToken/", {})
        .then((res) => {
          console.log(res);
          console.log(res.data);
          // console.log("config", config);
          // Cookies.setItem("accessToken", res.data.token);
        })
        .catch((err) => {
          window.location.href = "/login";
        });
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const TestPage = () => {
  const [User, setUser] = useContext(UserCtx);

  console.log("Access Token : ");
  console.log(Cookies.getItem("accessToken"));
  console.log("Refresh Token : ");
  console.log(Cookies.getItem("refreshToken"));
  console.log("expired : ");
  console.log(isTokenExpired(Cookies.getItem("accessToken")));

  const handleChangeContexct = () => {
    setUser("ceecec");
  };

  const handleBtnClick = () => {
    // login
    axiosInst2
      .post("http://localhost:2000/login/", {
        username: "yehia",
        password: "user12345",
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
    axiosInst2
      .post("http://localhost:2000/login/", {
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
    axiosInst
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
      <label>
        Token Exired :{" "}
        {JSON.stringify(isTokenExpired(Cookies.getItem("accessToken")))}
      </label>
      <label>{Cookies.getItem("accessToken")}</label>
      <label>{Cookies.getItem("refreshToken")}</label>

      <Button onClick={handleChangeContexct}>change init</Button>

      <Link to="/">nav to home</Link>
      <h1>{"user = " + JSON.stringify(UserService.isGuest())}</h1>
    </>
  );
};

export default TestPage;
