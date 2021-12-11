import { React, useState, useEffect, createRef } from "react";
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
import UserService from "../Services/UserService";
import { useHistory } from "react-router-dom";

import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";

const SignUp = () => {
  const [alertOpen, setalertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const history = useHistory();
  const theme = useTheme();
  const formRef = createRef();

  if (UserService.isLoggedIn()) {
    // if logged in redirect to home page
    console.log("redirecting to home page");
    history.push("/");
  }

  const handleNext = () => {
    if (!formRef.current.checkValidity()) return;
    if (activeStep < 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const showAlert = (message) => {
    setalertMessage(message);
    setalertOpen(true);

    setTimeout(() => {
      setalertOpen(false);
    }, 3000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep < 2) return;
    const password = formRef.current.password.value;
    const confirmPassword = formRef.current.confirmPassword.value;
    if (password !== confirmPassword) {
      showAlert("Passwords do not match");
      return;
    }
    const data = {
      firstName: formRef.current.firstName.value,
      lastName: formRef.current.lastName.value,
      username: formRef.current.username.value,
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      phoneNumber: formRef.current.phoneNumber.value,
      birthDate: formRef.current.birthDate.value,
      country: formRef.current.country.value,
      city: formRef.current.city.value,
      street: formRef.current.street.value,
      buildingNumber: formRef.current.buildingNumber.value,
      passportNumber: formRef.current.passportNumber.value,
      countryCode: formRef.current.countryCode.value,
    };
    console.log(data);

    UserService.signUp(data)
      .then((res) => {
        showAlert("Signed Up Successfuly");
        history.push("/login");
      })
      .catch((err) => {
        console.log("errr <===", err.response);
        const errorMessage = err.response.data;
        // alert(errorMessage);
        showAlert(errorMessage);
      });
  };

  return (
    <div
      class="align-items-center justify-content-center"
      style={{ fontFamily: "cursive" }}
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
          <Form ref={formRef} id="form1" onSubmit={handleSubmit}>
            <br />
            <br />
            <h2>Fill The Form</h2>
            <div style={{ display: activeStep !== 0 ? "none" : "" }}>
              <Row>
                <Col>
                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="firstName"
                      name="firstName"
                      placeholder="Enter Your First Namer"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group style={{ width: "auto" }} controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="lastName"
                      placeholder="Enter Your Last Name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Your Email Address"
                    required
                  />
                </Form.Group>
              </Row>
            </div>

            <div style={{ display: activeStep !== 1 ? "none" : "" }}>
              <Row>
                <Col>
                  <Form.Group style={{ width: "auto" }} controlId="birthDate">
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control type="date" name="birthDate" required />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group as={Col} controlId="passportNumber">
                    <Form.Label>Passport Number</Form.Label>
                    <Form.Control
                      name="passportNumber"
                      placeholder="Enter Your passport Number "
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group as={Col} controlId="formGridFirst">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      name="country"
                      placeholder="Enter Country Name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="formGridPriceFirst">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    placeholder="Enter City Name"
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBusiness">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    name="street"
                    placeholder="Enter Street Name "
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPriceBusiness">
                  <Form.Label>Building Number</Form.Label>
                  <Form.Control
                    type="Number"
                    name="buildingNumber"
                    placeholder="Enter Building Number"
                    required
                  />
                </Form.Group>
              </Row>

              <Row>
                <Col>
                  <Form.Group as={Col} controlId="countryCode">
                    <Form.Label>Country Code</Form.Label>
                    <Form.Control
                      name="countryCode"
                      placeholder="Enter Your Country Code"
                      required
                    />
                  </Form.Group>
                </Col>
                <Form.Group as={Col} controlId="phoneNumbers">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    required
                  />
                </Form.Group>
              </Row>
            </div>

            <div style={{ display: activeStep !== 2 ? "none" : "" }}>
              <Row>
                <Form.Group as={Col} controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    name="username"
                    placeholder="Choose Your username"
                    required
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Choose Your password"
                    required
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat the password"
                    required
                  />
                </Form.Group>
              </Row>
            </div>
            <br />
            <div>
              {/* <Button
                className="mt-2"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "0px",
                }}
                variant="primary"
                type="submit"
              >
                Sign Up
              </Button> */}
            </div>
            <MobileStepper
              style={{ backgroundColor: "transparent", width: "auto" }}
              variant="progress"
              steps={3}
              position="static"
              activeStep={activeStep}
              sx={{ flexGrow: 1 }}
              nextButton={
                <Button
                  type="submit"
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === 15}
                >
                  {activeStep === 2 ? "SignUp" : "Next"}
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </Button>
              }
            />
            <br />
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
