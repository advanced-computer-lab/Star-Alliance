import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextField from "@mui/material/TextField";
import Carousel from "react-bootstrap/Carousel";
import Box from '@mui/material/Box';

const userHomePage = () => {
  return (
    <div  id="testing" style={{fontFamily:"cursive",marginTop:"1cm",color:"white"}}>
      <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "10cm" }}
              src="https://media.istockphoto.com/photos/passenger-airplane-flying-above-clouds-during-sunset-picture-id155439315?b=1&k=20&m=155439315&s=170667a&w=0&h=N2BzlH2GYabhWN0LXZTqTkVODuTb8qDAESQYCPzIig8="
              alt="First slide"
            />
            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "10cm" }}
              src="https://media.istockphoto.com/photos/corporate-jet-picture-id1305805559?b=1&k=20&m=1305805559&s=170667a&w=0&h=PgS30I7bdCmaWZXC7tHeRjhAUFoiv7LDgeqJBpfVorw="
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "10cm" }}
              src="https://t4.ftcdn.net/jpg/02/71/78/29/240_F_271782927_keMVFo9PnBwrMEmbiUGKRcDT2rzf85dj.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    <div   style={{borderRadius:"2rem",backgroundColor:"#112D4E",width:"22cm",marginLeft:"10cm",marginBottom:"3cm",height:"12cm",marginTop:"1cm" }}>
  <div style={{width:"16cm",marginLeft:"3cm",marginRight:"2cm"}}>

    <Form 
      action="http://localhost:8080/GetRequestedFlights"
      method="post"
    >
      <Row>
      <h3 className="mt-3 mb-2">Book Your Flight! ✈</h3>

      <Form.Group as={Col} controlId="formGridState">
      <Form.Label>From</Form.Label>
      
      <Form.Select  name="arrivalAirport" defaultValue="">
        <option  value="LAX">LAX</option>
        <option  value="JFK">JFK</option>
        <option value="LHR">LHR</option>
        <option value="CAI">CAI</option>
        <option value="EXP">EXP</option>
        <option value="MUC">MUC</option>
        <option value="CDG">CDG</option>
        <option value="RUH">RUH</option>
        <option value="YYZ">YYZ</option>
        <option value="FRA">FRA</option>
      </Form.Select>
    </Form.Group>
        <Col >
        <Form.Group as={Col} controlId="formGridState">
      <Form.Label>To</Form.Label>
      <Form.Select  name="departureAirport" defaultValue="">
        <option  value="LAX">LAX</option>
        <option  value="JFK">JFK</option>
        <option value="LHR">LHR</option>
        <option value="CAI">CAI</option>
        <option value="EXP">EXP</option>
        <option value="MUC">MUC</option>
        <option value="CDG">CDG</option>
        <option value="RUH">RUH</option>
        <option value="YYZ">YYZ</option>
        <option value="FRA">FRA</option>
      </Form.Select>
    </Form.Group>
        </Col>
      </Row>
      <Row>
      <Col>

        <Form.Group  style={{width:"auto"}}  controlId="formGridArrivalTime">
          <Form.Label>Arrival Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="arrivalTime"
            placeholder="Enter Arrival Time"
          />
        </Form.Group>
        </Col>
        <Col>
          <Form.Group  style={{width:"auto"}}  controlId="formGridDepartureTime">
          <Form.Label>Departure Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="departureTime"
            placeholder="Enter Departure Time"
          />
        </Form.Group>
        </Col>
       

      </Row>

      <Row >
      <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Adult(s)</Form.Label>
      
      <Form.Select  name="adult" defaultValue="1">
        <option  value="1">1</option>
        <option  value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="20">20</option>
        
      </Form.Select>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
   
      <Form.Label>Child(ren)</Form.Label>
      <Form.Select  name="children" defaultValue="0">
      <option  value="0">0</option>
        <option  value="1">1</option>
        <option  value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        
      </Form.Select>
    </Form.Group>
      </Row>
      <Row >
        <Form.Group as={Col}  controlId="formGridPriceEco">
          <Form.Label>Departure Airport</Form.Label>
          <Form.Control
            name="DepartureAirport"
            placeholder="Please Enter the price"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPriceFirst">
          <Form.Label>Arrival Airport</Form.Label>
          <Form.Control
            name="ArrivalAirport"
            placeholder="Please Enter the price"
          />
        </Form.Group>
      </Row>
      <Row> 
        <Col>
      <Form.Group controlId="cabinClass">
      <Form.Label>Cabin class</Form.Label>
      <Form.Select name= "type"defaultValue="Economy">
        <option value="Economy">Economy</option>
        <option value="Business">Business</option>
        <option value="First Class">First Class</option>
      </Form.Select>
    </Form.Group>
    </Col>
    <Col>

          <Button  className="mt-4"  variant="primary" type="submit">
            Search Flight ✈
           
          </Button>
        </Col>

        </Row>

    </Form>
    </div>

  </div>
  </div>



    );
};


export default userHomePage;
