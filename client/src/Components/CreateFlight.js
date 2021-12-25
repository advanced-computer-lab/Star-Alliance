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
import Alert from "./Alert.js";

const CreateFlight = () => {
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
    console.log("teste",e);
      const data = {
        flightNumber: e.target.flightNumber.value,
        arrivalTime:  moment(e.target.arrivalTime.value).format("yyyy-MM-DDThh:mm"),
        departureTime: moment(e.target.departureTime.value).format("yyyy-MM-DDThh:mm"),
        economySeatsNum: e.target.economySeatsNum.value,
        businessSeatsNum: e.target.businessSeatsNum.value,
        firstSeatsNum: e.target.firstSeatsNum.value,
        departureAirport: e.target.departureAirport.value,
        arrivalAirport: e.target.arrivalAirport.value,
        firstClassPrice: e.target.firstClassPrice.value,
        businessClassPrice: e.target.businessClassPrice.value,
        economyClassPrice: e.target.economyClassPrice.value,
        arrivalTerminal: e.target.arrivalTerminal.value,
        departureTerminal: e.target.departureTerminal.value,

    };
    FlightService.createFlight(data)
    .then((res) => {
      showAlert("Flight Created Successfuly");
    }) .catch((err) => {
      console.log("errr <===", err.response);
      const errorMessage = err.response.data;
      // alert(errorMessage);
      showAlert(errorMessage);
    });
  }


  return (
    <div class="align-items-center justify-content-center" style={{fontFamily:""}}>
   
      <br></br>
      <br></br>
      <br></br>
      <Alert
        open={alertOpen}
        setOpen={setalertOpen}
        title={alertMessage}
        desc=""
      />
      <Form onSubmit={handleSubmit}
      >
        {/* <h3 classname="mb-1" >Create Flight</h3> */}

        <Row>
          <Form.Group as={Col} controlId="formGridflightNumber">
            <Form.Label>Flight Number</Form.Label>
            <Form.Control
              name="flightNumber"
              placeholder="Enter Flight Number"
            />
          </Form.Group>
        </Row>
        <Row>
        <Col>
            <Form.Group  style={{width:"auto"}}  controlId="formGridDepartureTime">
            <Form.Label>Departure Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="departureTime"
              placeholder="Enter Departure Time"
              defaultValue={moment(new Date()).format("yyyy-MM-DD")}
              min={moment(new Date()).format("yyyy-MM-DD")}
            />
          </Form.Group>
          </Col>
        <Col>

          <Form.Group  style={{width:"auto"}}  controlId="formGridArrivalTime">
            <Form.Label>Arrival Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="arrivalTime"
              placeholder="Enter Arrival Time"
              defaultValue={moment(new Date()).format("yyyy-MM-DD")}
              min={moment(new Date()).format("yyyy-MM-DD")}
            />
          </Form.Group>
          </Col>
          

        </Row>

        <Row >
        <Form.Group as={Col}  controlId="formGridEconomy">
            <Form.Label>Economy Seats Number</Form.Label>
            <Form.Control
              name="economySeatsNum"
              placeholder="Enter Economy Seat Numbers "
            />
          </Form.Group>
          <Form.Group as={Col}  controlId="formGridPriceEco">
            <Form.Label>Economy Class Price </Form.Label>
            <Form.Control
              name="economyClassPrice"
              placeholder="Please Enter the price"
            />
          </Form.Group>
          

        </Row>

       
        <Row >
        <Form.Group as={Col} controlId="formGridFirst">
            <Form.Label>First Seats Number</Form.Label>
            <Form.Control
              name="firstSeatsNum"
              placeholder="Enter First Seat Numbers "
            />
          </Form.Group>
          

          <Form.Group as={Col} controlId="formGridPriceFirst">
            <Form.Label>First Class Price</Form.Label>
            <Form.Control
              name="firstClassPrice"
              placeholder="Please Enter the price"
            />
          </Form.Group>
        </Row>
        <Row>
        <Form.Group as={Col}  controlId="formGridBusiness">
            <Form.Label>Business Seats Number</Form.Label>
            <Form.Control
              name="businessSeatsNum"
              placeholder="Enter Business Seat Numbers "
            />
          </Form.Group>
        <Form.Group
              as={Col}
              controlId="formGridPriceBusiness"
            >
              <Form.Label>Business Class Price </Form.Label>
              <Form.Control
                name="businessClassPrice"
                placeholder="Please Enter the price"
              />
            </Form.Group>
          
        
            </Row>
            <Row >


              
              
        <Form.Group as={Col} controlId="formGriddepartureAirport" >
         <Form.Label>Departure Airport </Form.Label>
            <Form.Control
              name="departureAirport"
              placeholder="Enter Departure Airport"
              />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="formGridrArivalAirport"
              >
                <Form.Label>Arrival Airport </Form.Label>
                <Form.Control
                  name="arrivalAirport"
                  placeholder="Enter Arrival Airport"
                />
              </Form.Group>
            </Row>
            <Row>
           

        <Form.Group as={Col} controlId="formGriddepartureAirport" >
         <Form.Label>Departure Terminal </Form.Label>
            <Form.Control
              name="departureTerminal"
              placeholder="Enter Departure Terminal"
              />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="formGridrArivalAirport"
              >
                <Form.Label>Arrival Terminal </Form.Label>
                <Form.Control
                  name="arrivalTerminal"
                  placeholder="Enter Arrival Terminal"
                />
              </Form.Group>
            </Row>
          <div>
            <Button  className="mt-2" style={{ display: "block",marginLeft: "auto",marginRight: "0px" }} variant="primary"  type="submit">
              Create Flight
            </Button>
          </div>
       
      </Form>
    </div>
  );
};
export default CreateFlight;


