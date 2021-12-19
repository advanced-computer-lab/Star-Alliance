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
import { useHistory } from "react-router-dom";
import { UserCtx } from "../Context/GlobalContext.js";
import UserService from "../Services/UserService";
import Spinner from "react-bootstrap/Spinner";

const SignIn = () => {
  let history = useHistory();
  const [user, setUser] = useContext(UserCtx);
  const [loading, setloading] = useState(false);

  // if logged in redirect to home page
  console.log("checking");
  console.log("isloggedin", UserService.isLoggedIn());

  if (UserService.isLoggedIn()) {
    console.log("redirecting to home page");
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

        history.push("/");
      })
      .catch((err) => {
        console.log("errr <===", err.response);
        setloading(false);
        const errorMessage = err.response.data;
        // alert(errorMessage);
        showAlert(errorMessage);
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
      <div
        style={{
          borderRadius: "2rem",
          backgroundColor: "#112D4E",
          marginLeft: "6cm",
          marginRight: "6cm",
        }}
      >
        <div style={{ marginLeft: "2cm", marginRight: "2cm", color: "white" }}>
          <Form onSubmit={handleSubmit}>
            {/* <h3 classname="mb-1" >Create Flight</h3> */}
            <br />
            <br />
            <h2>Sign in</h2>
            <pre>admin:admin|user:user |||| TODO: remove this</pre>
            <Row>
              <Form.Group as={Col} controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  name="username"
                  placeholder="Enter Your Username"
                />
              </Form.Group>
            </Row>
            <Row>
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
                className="mt-2"
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
            <br />
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
