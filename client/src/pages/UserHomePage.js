import React, { useState } from "react";
import { useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
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
import { Link, useHistory } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import { EditReservationCtx } from "../Context/EditReservationContext";
import MoreThanFlight from "../Components/MoreThanFlight";
import moment from "moment";
import YouTube from "react-youtube";
import tot from "../images/tot.png";
import top from "../images/top.png";
import Alert from "../Components/Alert";
import ContinueReservingBar from "../Components/ContinueReservingBar";

const UserHomePage = () => {
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  const [loadingSearch, setloadingSearch] = useState(false);
  const history = useHistory();
  const formRef = useRef(null);
  const goingData = [];
  //var clicked=true;
  const [alertOpen, setalertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const showAlert = (message) => {
    setalertMessage(message);
    setalertOpen(true);

    setTimeout(() => {
      setalertOpen(false);
    }, 3000);
  };
  const [clicked, setClicked] = useState(false);

  var today = new Date();
  var dd = String(today.getDate() + 1).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  function checkDate(departureTime, arrivalTime) {
    let date = new Date(departureTime);
    let date2 = new Date(arrivalTime);
    console.log("checkdate1", date);
    console.log("checkdate2", date2);
    console.log("checkdate2", date2.getFullYear());
    console.log("checkdate2", date2.getDate());
    console.log("checkdate2", date2.getMonth());
    if (date.getFullYear() < date2.getFullYear()) {
      return false;
    } else if (date.getFullYear() == date2.getFullYear()) {
      if (date.getMonth() < date2.getMonth()) {
        return false;
      } else if (date.getMonth() == date2.getMonth()) {
        if (date.getDate() <= date2.getDate()) {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  function show() {
    setClicked(true);
  }
  const handleSubmit = () => {
    var e = formRef.current;
    let checkBigger = checkDate(
      moment(e.departureTime.value).format("yyyy-MM-DDThh:mm"),
      moment(e.arrivalTime.value).format("yyyy-MM-DDThh:mm")
    );
    if (checkBigger == false) {
      setloadingSearch(true);

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
      if (data.arrivalAirport == data.departureAirport) {
        setloadingSearch(false);
        showAlert("Going Destination cannot be the same as return");
      } else {
        FlightService.GetRequestedFlights(data).then(({ data }) => {
          console.log("ana", data);

          if (data.going.length == 0 || data.returning.length == 0) {
            setloadingSearch(false);
            showAlert("No Available Flights with this Date");
          } else {
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
            setSearchFlights({
              ...searchFlights,
              data,
              selected,
            });
            console.log("gigi", searchFlights);
            show();
            console.log(clicked);
            history.push("/SelectFlight");
          }
        });
      }
    } else {
      showAlert("Return Date Cannot be after Going Date");
    }
  };
  return (
    <div
      className="mt-1  "
      id="testing"
      style={{ fontFamily: "", color: "white" }}
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            style={{ height: "70vh" }}
            src="https://images.unsplash.com/photo-1512465467056-c049f745d95b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
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
            style={{ height: "70vh" }}
            src="https://images.unsplash.com/photo-1524592714635-d77511a4834d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
            style={{ height: "70vh" }}
            src="https://images.unsplash.com/photo-1532364158125-02d75a0f7fb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Above All, We Care</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Alert
        open={alertOpen}
        setOpen={setalertOpen}
        title={alertMessage}
        desc=""
      />

<ContinueReservingBar />
      <div
        className="mt-5 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2 " //
        style={{
          borderRadius: "2rem",
          backgroundColor: "#112D4E",
          height: "auto",
        }}
      >
        <div
          style={{ height: "auto" }}
          className=" col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-10 offset-lg-1 "
        >
          <Form ref={formRef}>
            <Row>
              <h3 className="mt-3 mb-2">Book Your Flight! ✈ </h3>
              <Col>
                <Form.Group
                  as={Col}
                  style={{ width: "auto" }}
                  controlId="formGridState"
                >
                  <Form.Label>
                    From <FontAwesomeIcon icon={faPlaneDeparture} />
                  </Form.Label>
                  <Form.Select name="departureAirport" defaultValue="LAX">
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

              <Form.Group
                style={{ width: "auto" }}
                as={Col}
                controlId="formGridState"
              >
                <Form.Label>
                  To <FontAwesomeIcon icon={faPlaneArrival} />
                </Form.Label>

                <Form.Select name="arrivalAirport" defaultValue="JFK">
                  <option value="LAX">LAX</option>
                  <option value="JFK"> JFK</option>
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
                    defaultValue={moment(new Date()).format("yyyy-MM-DD")}
                    min={moment(new Date()).format("yyyy-MM-DD")}
                    value="2022-04-01"
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
                    defaultValue={moment(today).format("yyyy-MM-DD")}
                    min={moment(new Date()).format("yyyy-MM-DD")}
                    value="2022-05-01"
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
                  type="button"
                  onClick={handleSubmit}
                  disabled={loadingSearch}
                >
                  Search Flight {"   "}
                  {loadingSearch ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faSearch} />
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
          <br />
        </div>
      </div>
      <br />
      <br />

      <div
        className="col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1  "
        style={{ backgroundColor: "#112D4E", borderRadius: "2.5rem" }}
      >
        <div className="mt-3 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 ">
          <br />
          <Row>
            <h2 as={Col}>
              Discover Egypt with a stopover <FontAwesomeIcon icon={faAnkh} />{" "}
              <img as={Col} style={{ height: "5vh", width: "5vh" }} src={tot} />
            </h2>
          </Row>
          <br />
          <iframe
            className="col-lg-12 col-md-12 col-sm-12  "
            id="ytplayer"
            // width="1050"
            height="600"
            src="https://www.youtube.com/embed/HwM86WQ-0vY?autoplay=1&mute=1&playlist=HwM86WQ-0vY,msJ_JJB8q3s,k3KqP69xuPc&loop=1"
          ></iframe>
        </div>
        <br />
      </div>

      <MoreThanFlight />

      <br />
      <br />
      <Row>
        <br />
        <a href="#top">
          <img
            style={{
              marginRight: "0.4cm",
              float: "right",
              height: "50px",
              width: "50px",
            }}
            src={top}
          />
        </a>
      </Row>
      <div style={{ height: "40cm" }} className="footerInc"></div>
    </div>
  );
};
export default UserHomePage;
