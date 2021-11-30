import { React, useState, useEffect, createRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Nav, NavDropdown, Link } from "react-bootstrap";
//import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import Alert from "./Alert.js";

import FlightService from "../Services/FlightService";

const DeletePopup = () => {
  const [alertOpen, setalertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState("");


  const confirmation = (data) => {
    console.log("data", data);
    const resp = window.confirm("Are you sure you want to delete", "");
    if(resp){
    FlightService.DeleteFlight(data)
      .then((res) => {
        console.log("OK ===> ", res);
        const alertMess = showAlert("You have deleted the flight successfuly");
        //console.log(alertMess);
      })
      .catch((err) => {
        console.log("errr <===", err.response);
        const errorMessage = err.response.data;
        // alert(errorMessage);
        showAlert(errorMessage);
      });
    }
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // datetime example "2016-05-18T16:00:00Z"
    const data = {
      flightNumber: e.target.flNumber.value,
      redirectTo: ""
    };
    confirmation(data);

   
  };

  const showAlert = (message) => {
    setalertMessage(message);
    setalertOpen(true);

    setTimeout(() => {
      setalertOpen(false);
    }, 3000);
  };

  return (
    <>
      <br></br>
      <br></br>
      <br></br>

      <Alert
        open={alertOpen}
        setOpen={setalertOpen}
        title={alertMessage}
        desc=""
      />

      

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Flight Number</Form.Label>
          <div class="input-group ">
            <Form.Control
              name="flNumber"
              type="string"
              placeholder="Enter Flight Number"
              required
            />
            <div class="input-group-append">
              <Button variant="danger" type="submit">
                Delete Flight
              </Button>
            </div>
          </div>

{/*           <Button
            variant="danger"
            type="submit"
            className="mt-2"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "0px",
              // width: "10%",
            }}
          >
            Delete Flight
          </Button> */}
        </Form.Group>
      </Form>
    </>
  );
};

// "economySeatsNum": 3,
// "businessSeatsNum": 5,
// "firstSeatsNum": 4,
// "departureAirport": "cairo",
// "arrivalAirport": "jedda",
// "price": 1

export default DeletePopup;
