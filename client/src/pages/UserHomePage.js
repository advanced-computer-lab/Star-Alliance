import React, { useState } from "react";
import { useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import FlightService from "../Services/FlightService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
import { faMale } from "@fortawesome/free-solid-svg-icons";
import { faAnkh } from "@fortawesome/free-solid-svg-icons";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import MoreThanFlight from "../Components/MoreThanFlight";
import moment from "moment";
import advert from "../Videos/advert2.mp4";


//var egy= "https://flagpedia.net/data/flags/w702/eg.png";

const UserHomePage = () => {
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  const formRef = useRef(null);
  const goingData = [];
  //var clicked=true;
  const [clicked, setClicked] = useState(false);

  function show() {
    setClicked(true);
  }

  const handleSubmit = () => {
    var e = formRef.current;
    console.log("enter", formRef.current.departureAirport.value);
    const data = {
      //Going
      //  moment(arrivalTime).format("yyyy-MM-DDThh:mm");
      arrivalAirport: e.arrivalAirport.value,
      departureAirport: e.departureAirport.value,
      departureTime: moment(e.departureTime.value).format("yyyy-MM-DDThh:mm"),
      // returning
      arrivalTime2: moment(e.arrivalTime.value).format("yyyy-MM-DDThh:mm"),
      ///
      type: e.type.value,
      children: e.children.value,
      adult: e.adult.value,
    };
    console.log(data);

    FlightService.GetRequestedFlights(data).then(({ data }) => {
      console.log(data);
      searchFlights.data = data;
      console.log(clicked);
      show();
      console.log(clicked);
    });
  };
  return (
    <div
      id="testing"
      style={{ fontFamily: "cursive", marginTop: "1cm", color: "white" }}
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ height: "10cm" }}
            src="https://media.istockphoto.com/photos/passenger-airplane-flying-above-clouds-during-sunset-picture-id155439315?b=1&k=20&m=155439315&s=170667a&w=0&h=N2BzlH2GYabhWN0LXZTqTkVODuTb8qDAESQYCPzIig8="
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Above All, We Care</h3>
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
            <h3>Above All, We Care</h3>
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
            <h3>Above All, We Care</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div
        style={{
          borderRadius: "2rem",
          backgroundColor: "#112D4E",
          width: "22cm",
          marginLeft: "10cm",
          marginBottom: "3cm",
          height: "11cm",
          marginTop: "1cm",
        }}
      >
        <div style={{ width: "16cm", marginLeft: "3cm", marginRight: "2cm" }}>
          <Form ref={formRef}>
            <Row>
              <h3 className="mt-3 mb-2">Book Your Flight! ✈ </h3>
              <Col>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>
                    From <FontAwesomeIcon icon={faPlaneDeparture} />
                  </Form.Label>
                  <Form.Select name="departureAirport" defaultValue="">
                    <option value="LAX">LAX</option>
                    <option value="JFK">JFK</option>
                    <option value="LHR">LHR</option>
                    <option value="CAI">CAI </option>
                    <option value="EXP">EXP</option>
                    <option value="MUC">MUC</option>
                    <option value="CDG">CDG</option>
                    <option value="RUH">RUH</option>
                    <option value="YYZ">YYZ</option>
                    <option value="FRA">FRA</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>
                  To <FontAwesomeIcon icon={faPlaneArrival} />
                </Form.Label>

                <Form.Select name="arrivalAirport" defaultValue="">
                  <option value="LAX">LAX</option>
                  <option value="JFK" selected>
                    JFK
                  </option>
                  <option value="LHR">LHR</option>
                  <option value="CAI"> CAI </option>
                  <option value="EXP">EXP</option>
                  <option value="MUC">MUC</option>
                  <option value="CDG">CDG</option>
                  <option value="RUH">RUH</option>
                  <option value="YYZ">YYZ</option>
                  <option value="FRA">FRA</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group
                  style={{ width: "auto" }}
                  controlId="formGridDepartureTime"
                >
                  <Form.Label>
                    Going Date <FontAwesomeIcon icon={faCalendarAlt} />
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="departureTime"
                    placeholder="Enter Departure Time"
                   // value="2022-01-01T10:00"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  style={{ width: "auto" }}
                  controlId="formGridArrivalTime"
                >
                  <Form.Label>
                    Returning Date <FontAwesomeIcon icon={faCalendarAlt} />
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="arrivalTime"
                    placeholder="Enter Arrival Time"
                  //  value="2022-01-22T10:00"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>
                  Adult(s) <FontAwesomeIcon icon={faMale} />
                </Form.Label>

                <Form.Select name="adult" defaultValue="1">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="20">20</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>
                  Child(ren) <FontAwesomeIcon icon={faBaby} />
                </Form.Label>
                <Form.Select name="children" defaultValue="0">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="cabinClass">
                  <Form.Label>Cabin Class</Form.Label>
                  <Form.Select name="type" defaultValue="Economy">
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First Class">First Class</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  className="mt-4"
                  variant="primary"
                  onClick={handleSubmit}
                >
                  Confirm <FontAwesomeIcon icon={faCheckCircle} />
                </Button>

                {clicked == true ? (
                  <Link to="/SelectFlight">
                    <Button
                      style={{ marginLeft: "0.5cm" }}
                      className="mt-4"
                      variant="primary"
                      type="button"
                    >
                      Search Flight <FontAwesomeIcon icon={faSearch} />{" "}
                    </Button>{" "}
                  </Link>
                ) : null}
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div  style={{backgroundColor:"#112D4E",marginLeft:"4cm",marginRight:"4cm",borderRadius: "2.5rem"}}>
      <div  style={{marginBottom:"2`cm",marginTop:"1cm",marginLeft:"3cm"}}>
      <br />
      <Row>
      <h2 as={Col}>Why to Visit Egypt? <FontAwesomeIcon icon={faAnkh} />  <img as={Col} style={{height:"1cm",width:"1cm"}} src="https://cdn-icons.flaticon.com/png/512/2276/premium/2276743.png?token=exp=1638210149~hmac=c72fe8a19aa0ead8a61de864a6b041a7"/>
</h2>
      </Row>
      <video loop autoPlay muted width="1000" height="600" controls>  

  <source src={advert} type="video/mp4"/>
  Your browser does not support the video tag.
   </video>
   </div>
   <br />
   </div>
      <MoreThanFlight />
    </div>
  );
};
export default UserHomePage;
