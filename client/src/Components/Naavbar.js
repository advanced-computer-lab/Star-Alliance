import React, { useState, useEffect, useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Nav, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logo.png";
import UserService, { UserCtx } from "../Services/UserService.js";
import { UserCtxInit } from "../Context/GlobalContext";
import PopupView from "./PopupView";
import TextField from "@mui/material/TextField";
import { LinkContainer } from "react-router-bootstrap";
import { UserHomeCtx, UserHomeCtxInit } from "../Context/UserHomeContext";
import {
  faChild,
  faSignInAlt,
  faTicketAlt,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import AuthService from "../Services/AuthService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Naavbar = () => {
  const refUserName = useRef(null);
  const refUserPass = useRef(null);
  const [user, setUser] = useContext(UserCtx);
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);

  const history = useHistory();
  let r = user.id;
  console.log("showName", user);

  const AuthForm = () => {
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

    return <Button onClick={handleBtnClick}>Login </Button>;
  };

  const [popLogin, setpopLogin] = useState(false);

  const handleLoginBtn = () => {
    setpopLogin(true);
  };

  const handleSignoutClick = () => {
    AuthService.logout()
      .then((res) => {
        console.log(res);
        history.push("/");
        setUser(UserCtxInit);
        setSearchFlights(UserHomeCtxInit);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Navbar
        fixed="top"
        style={{
          height: "8rem",
          fontFamily: "",
          backgroundColor: "#112D4E",
          opacity: 0.86,
        }}
        expand="lg"
        variant="dark"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand style={{ color: "#DBE2EF" }}>
              <img style={{ height: "2cm", width: "2cm" }} src={logo} />
              Star-Alliance
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {UserService.isUser() && (
                <LinkContainer to="/">
                  <Nav.Link style={{ color: "#DBE2EF" }}>
                    Book Flight ✈
                  </Nav.Link>
                </LinkContainer>
              )}
              {UserService.isUser() && (
                <LinkContainer to="/ReservationView">
                  <Nav.Link style={{ color: "#DBE2EF" }}>
                    My reservations <FontAwesomeIcon icon={faTicketAlt} />
                  </Nav.Link>
                </LinkContainer>
              )}
              {UserService.isUser() && (
                <LinkContainer to="/UpdateUserData">
                  <Nav.Link style={{ color: "#DBE2EF" }}>
                    My Profile <FontAwesomeIcon icon={faUserAlt} />
                  </Nav.Link>
                </LinkContainer>
              )}

              {UserService.isUser() && (
                <LinkContainer to="ViewChild">
                  <Nav.Link style={{ color: "#DBE2EF" }}>
                    Child Reserservations <FontAwesomeIcon icon={faChild} />
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text style={{ marginRight: "1cm" }}>
              {UserService.isLoggedIn() &&
                (UserService.isAdmin()
                  ? `Welcome, ${user.name}`
                  : `Welcome, ${user.name}`)}
            </Navbar.Text>
            <Nav>
              {UserService.isLoggedIn() ? (
                <Navbar.Text>
                  <Nav.Link onClick={handleSignoutClick}>
                    Log Out <FontAwesomeIcon icon={faSignOutAlt} />
                  </Nav.Link>
                </Navbar.Text>
              ) : (
                <>
                  <LinkContainer to="/signin">
                    <Nav.Link style={{ color: "#DBE2EF" }}>
                      Login <FontAwesomeIcon icon={faSignInAlt} />
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <Nav.Link style={{ color: "#DBE2EF" }}>Sign up</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
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
