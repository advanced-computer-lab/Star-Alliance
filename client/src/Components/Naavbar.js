import React, { useState, useEffect, useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Nav, NavDropdown, Link } from "react-bootstrap";
//import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logo.png";
import UserService, { UserCtx } from "../Services/UserService.js";
import PopupView from "./PopupView";
import TextField from "@mui/material/TextField";

//const logo= "	https://o.remove.bg/downloads/e14af0fc-8d3f-4a5a-8dc4-15aca52535d1/7-removebg-preview.png"
const Naavbar = () => {
  const refUserName = useRef(null);
  const refUserPass = useRef(null);

  const AuthForm = () => {
    const [User, SetUser] = useContext(UserCtx);
    return (
      <>
        <TextField
          id="userName"
          label="Username / Email"
          variant="filled"
          fullWidth
          inputRef={refUserName}
        />
        <br />
        <TextField
          id="userPass"
          a
          label="Password"
          variant="filled"
          fullWidth
          inputRef={refUserPass}
        />
        <br />
        <label>user:user</label>
        <br />
        <label>admin:admin</label>
      </>
    );
  };
  const AuthActionButton = () => {
    const handleBtnClick = () => {
      const username = refUserName.current.value;
      const password = refUserPass.current.value;
      if (username === "user" && password === "user") {
        setUser({ ...user, type: 1 });
        setpopLogin(false);
      } else if (username === "admin" && password === "admin") {
        setUser({ ...user, type: 2 });
        setpopLogin(false);
      } else alert("Wrong username or password");
    };

    return <Button onClick={handleBtnClick}>Login In</Button>;
  };
  // const newUser = UserService.getUser();

  // console.log(newUser);
  const [user, setUser] = useContext(UserCtx);

  const [popLogin, setpopLogin] = useState(false);

  const handleLoginBtn = () => {
    setpopLogin(true);
  };

  return (
    <>
      {/* <Navbar bg="dark" fixed="top">
    <Container>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar> */}
      {/* <h1>Hello</h1> */}
      {/* TODO: make fixed top have an actual hight? */}
      <Navbar
        fixed="top"
        style={{
          height: "5rem",
          fontFamily: "cursive",
          backgroundColor: "#112D4E",
        }}
        expand="lg"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/userHome" style={{ color: "#DBE2EF" }}>
            <img style={{ height: "1cm", width: "2cm" }} src={logo} />
            Star-Alliance
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/ReservationView" style={{ color: "#DBE2EF" }}>
                My reservations
              </Nav.Link>
              {/* <Nav.Link href="#link" style={{ color: "#DBE2EF" }}>
                Link
              </Nav.Link>
              <Nav.Link href="#link" style={{ color: "#DBE2EF" }}>
                Login
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {!UserService.isLoggedIn() ? (
                <Button onClick={handleLoginBtn} style={{ color: "white" }}>
                  Sign In
                </Button>
              ) : UserService.isAdmin() ? (
                "Welcome Admin"
              ) : (
                "Welcome User"
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <PopupView
        showDialog={popLogin}
        setshowDialog={setpopLogin}
        title="Login/Register"
        customActionButtons={<AuthActionButton />}
      >
        <AuthForm />
      </PopupView>
    </>
  );
};

export default Naavbar;
