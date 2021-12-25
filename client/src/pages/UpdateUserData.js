import { React, useState, useEffect, createRef,useContext  } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FlightService from "../Services/FlightService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPassport } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Alert from "../Components/Alert";
import { Link } from "react-router-dom";
import { UserCtx } from "../Context/GlobalContext";
import { faArrowRight, faStickyNote } from "@fortawesome/free-solid-svg-icons";

const UpdateUserData = () => {
  let updateFormRef = createRef();
  const [alertOpen, setalertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const [User, setUser] = useContext(UserCtx);

  useEffect(() => {
    FlightService.GetUserInfo({ findUser: User.id })
      .then(({ data }) => {
        console.log("recived", data);
        updateFormValues(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // datetime example "2016-05-18T16:00:00Z"
    const data = {
      findUser: User.id,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      passportNumber: e.target.passportNumber.value,
      email: e.target.email.value,
    };

    console.log("data", data);
    FlightService.updateUser(data);
    showAlert("User Info. Updated Successfuly");
  };

  const showAlert = (message) => {
    setalertMessage(message);
    setalertOpen(true);

    setTimeout(() => {
      setalertOpen(false);
    }, 3000);
  };

  const updateFormValues = (data) => {
    const { firstName, lastName, passportNumber, email } = data;
    console.log("firstName", updateFormRef.current);
    if (updateFormRef.current != null) {
      updateFormRef.current.firstName.value = firstName;
      updateFormRef.current.lastName.value = lastName;
      updateFormRef.current.passportNumber.value = passportNumber;
      updateFormRef.current.email.value = email;
    }
  };

  return (
    <div
      className="mt-1 col-xs-10 offset-xs-1"
      id="testing"
      style={{ fontFamily: "Verdana", fontSize: "15px", color: "white" }}
    >
      <br></br>
      <br></br>
      <br></br>
      <div  className="mt-1 col-xs-10 offset-xs-1"
      style={{display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"}}>
                  <h6 style={{color:"black"}}><Link to="/" style={{color:"black",textDecoration:"none"}}>Home Page </Link><FontAwesomeIcon icon={faArrowRight}/>
                  {" "} <b>Update Info.</b></h6>
         </div>
      <Alert
        open={alertOpen}
        setOpen={setalertOpen}
        title={alertMessage}
        desc=""
      />
      
      <div
        className="mt-5 col-xs-8 offset-xs-2 col-md-6 offset-md-3 "
        style={{
          borderRadius: "1rem",
          backgroundColor: "#112D4E",
          marginBottom: "15vh",
         
        }}
      >
        <div className="col-lg-10 offset-lg-1 col-md-8 offset-md-2">
          <Form className="col-xs-10 offset-xs-1" ref={updateFormRef} onSubmit={handleSubmit}>
            <br />
            <h3 className="mt-2 mb-2 mx-2">
              My Profile <FontAwesomeIcon icon={faUser} />{" "}
            </h3>

            <Row className="mx-2">
              <Form.Group  as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  placeholder="Enter Your first name"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name </Form.Label>
                <Form.Control
                  name="lastName"
                  placeholder="Enter your last name"
                />
              </Form.Group>
            </Row>
            <Row className="mx-2">
              <Form.Group as={Col} controlId="formGridPassportNumber">
                <Form.Label>
                  Passport Number{" "}
                  <FontAwesomeIcon
                    style={{ color: "white" }}
                    icon={faPassport}
                  />
                </Form.Label>
                <Form.Control
                  name="passportNumber"
                  placeholder="Enter your Passport Number"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>
                  Email <FontAwesomeIcon icon={faEnvelope} />{" "}
                </Form.Label>
                <Form.Control name="email" placeholder="enter your email" />
              </Form.Group>
            </Row>
                
            <div style={{ height: "3cm", marginTop: "0.8cm" }}>
            <Row>

            <Col className="mx-3">
              <Button type="submit" variant="primary">
                Update Info. <FontAwesomeIcon icon={faUserEdit} />
              </Button>
              {/* <div style={{marginLeft:"0.5cm"}}> */}
              <Link to="/ChangePassword">
            <Button className="mx-1" type="button" variant="primary">
              Change Password
            </Button>
          </Link>
          {/* </div> */}
              </Col>
            
          </Row>

            </div>
            
            
          </Form>
         
        </div>
      </div>
    </div>
  );
};

export default UpdateUserData;
