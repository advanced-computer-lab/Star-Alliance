import { React, useState, useEffect, createRef, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import FlightService from "../Services/FlightService";
import TextField from "@mui/material/TextField";
import Alert from "../Components/Alert.js";
import { gridRowsStateSelector } from "@mui/x-data-grid-pro";
import AuthService from "../Services/AuthService";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserCtx } from "../Context/GlobalContext.js";
import { UserHomeCtx } from "../Context/UserHomeContext.js";
import UserService from "../Services/UserService";
import Spinner from "react-bootstrap/Spinner";

const SignIn = () => {
  let history = useHistory();
  const [user, setUser] = useContext(UserCtx);
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  const [loading, setloading] = useState(false);

  // if logged in redirect to home page
  console.log("checking");
  console.log("isloggedin", UserService.isLoggedIn());

  if (UserService.isLoggedIn()) {
    console.log("redirecting to home page, user logged in");
    history.push("/");
  }

  const [alertOpen, setalertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const showAlert = (message) => {
    setalertMessage(message);
    setalertOpen(true);

    setTimeout(() => {
      setalertOpen(false);
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    setloading(true);
    AuthService.singin(data)
      .then((res) => {
        console.log(res);

        console.log("show", res.data);
        const { isAdmin, userId, name } = res.data;

        setUser({ ...user, id: userId, name, type: isAdmin ? 2 : 1 });

        // Redirect to continue, Meaning the guest was blocked from main.js
        const ContinueLocation = searchFlights.ContinueLocation;
        if (ContinueLocation) history.push(ContinueLocation);
        else history.push("/");
        setSearchFlights({ ...searchFlights, ContinueLocation: "" });
      })
      .catch((err) => {
        if (err) {
          console.log("errr <===", err.response);
          setloading(false);
          const errorMessage = err.response?.data;
          // alert(errorMessage);
          showAlert(errorMessage);
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <div 
      class="align-items-center justify-content-center"
      style={{ fontFamily: "" }}
    >
      <br></br>
      <br></br>
      <br></br>
      <Alert
        open={alertOpen}
        setOpen={setalertOpen}
        title={alertMessage}
        desc=""
      />
      <div className="col-xs-8 offset-xs-2 col-md-6 offset-md-3"
        style={{
          borderRadius: "2rem",
          backgroundColor: "#112D4E",
         
        }}
      >
        <div style={{ marginLeft: "2rem", marginRight: "2rem", color: "white" }}>
          <Form onSubmit={handleSubmit}>
            {/* <h3 classname="mb-1" >Create Flight</h3> */}
            <br />
            <br />
            <h2>Sign in</h2>

            <Row className="col-xs-10 offset-xs-1">
              <Form.Group as={Col} controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
               
                  type="username"
                  name="username"
                  placeholder="Enter Your Username"
                />
              </Form.Group>
            </Row>
            <Row className="col-xs-10 offset-xs-1">
              <Form.Group as={Col} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Your password"
                />
              </Form.Group>
            </Row>
            <br />
            <div>
              <Button
                className="mt-1 mb-3"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "0px",
                }}
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    {"Login "}
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                width: "auto",
                // justifyContent: "center",
                color: "#d1d1d1",
              }}
            >
              Don't have an account?
              {/* <br /> */}
              <Link to="/signup" style={{ color: "#d1d1d1" }}>
                Sign Up
              </Link>
            </div>
            <br />
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
