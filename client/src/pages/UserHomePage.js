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
import YouTube from "react-youtube";
import tot from "../images/tot.png";
import top from "../images/top.png";


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
      //console.log(data);
      //searchFlights.data = data;
      //console.log(clicked);
      const selected = {
        flight1: null,
        flight2: null,
        flight1seat: [],
        flight2seat: [],
        companions: {
          adultCount: parseInt(e.adult.value),
          childCount: parseInt(e.children.value),
        },
      };
      setSearchFlights({ data, selected });
      console.log("gigi", searchFlights);
      show();
      console.log(clicked);
    });
  };
  return (
    <div
      className="mt-1 "
      id="testing"
      style={{ fontFamily: "cursive", color: "white" }}
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            style={{ height: "50vh" }}
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
            style={{ height: "50vh" }}
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
            style={{ height: "50vh" }}
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
        className="mt-5"
        style={{
          borderRadius: "2rem",
          backgroundColor: "#112D4E",
          width: "115vh",
          marginLeft: "50vh",
          marginBottom: "15vh",
          height: "60vh",
        }}
      >
        <div className="col-lg-10 offset-lg-1 col-md-8 offset-md-2">
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
                    <option value="First">First</option>
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
                      style={{ marginLeft: "4vh" }}
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
      <div
        className="col-lg-10 offset-lg-1"
        style={{ backgroundColor: "#112D4E", borderRadius: "2.5rem" }}
      >
        <div className="mt-3 col-lg-10 offset-lg-1">
          <br />
          <Row>
            <h2 as={Col}>
              Why to Visit Egypt? <FontAwesomeIcon icon={faAnkh} />{" "}
              <img as={Col} style={{ height: "5vh", width: "5vh" }} src={tot} />
            </h2>
          </Row>
          <br />
          <iframe
            id="ytplayer"
            width="1050"
            height="600"
            src="https://www.youtube.com/embed/HwM86WQ-0vY?autoplay=1&mute=1&playlist=HwM86WQ-0vY,msJ_JJB8q3s,k3KqP69xuPc&loop=1"
          ></iframe>
        </div>
        <br />
      </div>
      {/* <Button style={{height:"1cm",width:"1cm"}} href="#top"><img style={{marginLeft:"0",height:"0.7cm",width:"0.7cm"}} src="https://cdn-icons.flaticon.com/png/512/4196/premium/4196777.png?token=exp=1638365014~hmac=d38a550c5c183f31c4ffdf6e65880d36" /></Button> */}

      <MoreThanFlight />
      <br />
      <br />
      <Row>
      <br/>
      <a href="#top">
          <img style={{marginRight:"0.4cm" ,float:"right",height:"50px",width:"50px"}} src={top} />
      </a>
      </Row>
    </div>
  );
};
export default UserHomePage;
