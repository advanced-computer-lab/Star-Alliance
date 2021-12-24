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
import MoreThanFlight from "../Components/MoreThanFlight";
import moment from "moment";
import YouTube from "react-youtube";
import tot from "../images/tot.png";
import top from "../images/top.png";
import Alert from "../Components/Alert";
import back from "../images/back.png";
import { faArrowRight, faStickyNote } from "@fortawesome/free-solid-svg-icons";

const EditFlight = () => {
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  const [loadingSearch, setloadingSearch] = useState(false);
  const history = useHistory();
  const formRef = useRef(null);
  const goingData = [];
  //var clicked=true;
  const [clicked, setClicked] = useState(false);

  console.log(searchFlights);
  function show() {
    setClicked(true);
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
  const handleSubmit = () => {
    setloadingSearch(true);
    var e = formRef.current;
    const data = {
      //Going
      departureTime: moment(e.departureTime.value).format("yyyy-MM-DDThh:mm"),
      // returning
      arrivalTime2: undefined,
      ///
      type: e.type.value,
      arrivalAirport: searchFlights.oldReservation.arrivalAirport,
      departureAirport: searchFlights.oldReservation.departureAirport,
      children: parseInt(
        searchFlights.oldReservation.reservDet.companions.childCount
      ),
      adult: parseInt(
        searchFlights.oldReservation.reservDet.companions.adultCount
      ),
    };
    console.log(data);

    FlightService.GetRequestedFlights(data).then(({ data }) => {
      const selected = {
        resId: searchFlights.oldReservation.reservDet.reservationID,
        flight1: null,
        //flight2: searchFlights,
        flight2Id: searchFlights.oldReservation.reservDet.unEditedFlightID,
        flight1seat: [],
        flight2seat: searchFlights.oldReservation.reservDet.flight2Seats,

        which: searchFlights.oldReservation.reservDet.which,
        flighttotalPrice:searchFlights.oldReservation.reservDet.flighttotalPrice,
        companions: {
          adultCount: parseInt(
            searchFlights.oldReservation.reservDet.companions.adultCount
          ),
          childCount: parseInt(
            searchFlights.oldReservation.reservDet.companions.childCount
          ),
        },
      };
      console.log("gigi", searchFlights);
      setSearchFlights({...searchFlights, data, selected});
      show();
      console.log(clicked);
      if (searchFlights.oldReservation.reservDet.which == "flight1") {
        let checkBigger = checkDate(
          moment(e.departureTime.value).format("yyyy-MM-DDThh:mm"),
          moment(
            searchFlights.oldReservation.reservDet.remianFlightDate
          ).format("yyyy-MM-DDThh:mm")
        );
        if (checkBigger == true) {
          showAlert("going Date Cannot be after returning Date");
          setTimeout(function () {
            window.location.href = "http://localhost:3000/";
          }, 3000);
        } else {
          if (data.going.length == 0 || data.returning.length == 0) {
            setloadingSearch(false);
            showAlert("No Available Flights with this Date");
            setTimeout(function () {
              window.location.href = "http://localhost:3000/";
            }, 3000);
          } else {
            history.push("/SelectEditFlight");
          }
        }
      } else {
        if (searchFlights.oldReservation.reservDet.which == "flight2") {
          let checkBigger = checkDate(
            moment(
              searchFlights.oldReservation.reservDet.remianFlightDate
            ).format("yyyy-MM-DDThh:mm"),
            moment(e.departureTime.value).format("yyyy-MM-DDThh:mm")
          );
          if (checkBigger == true) {
            showAlert("Return Date Cannot be before Going Date");
            setTimeout(function () {
              window.location.href = "http://localhost:3000/";
            }, 3000);
          } else {
            if (data.going.length == 0 || data.returning.length == 0) {
              setloadingSearch(false);
              showAlert("No Available Flights with this Date");
              setTimeout(function () {
                window.location.href = "http://localhost:3000/";
              }, 3000);
            } else {
              history.push("/SelectEditFlight");
            }
          }
        }
      }
    });
  };
  return (
    <div
      className="mt-1  "
      id="testing"
      style={{ fontFamily: "", color: "white" }}
    >
      <br />
      <br />
      <br />
      <br />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h6 style={{ color: "black" }}>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            Home Page{" "}
          </Link>
          <FontAwesomeIcon style={{ color: "black" }} icon={faArrowRight} />{" "}
          <Link
            to="/ReservationView"
            style={{ color: "black", textDecoration: "none" }}
          >
            My Reservations{" "}
          </Link>
          <FontAwesomeIcon icon={faArrowRight} /> <b>Search</b>
        </h6>
      </div>
      <Alert
        open={alertOpen}
        setOpen={setalertOpen}
        title={alertMessage}
        desc=""
      />
      <div
        className=" mt-5 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2 " //
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
                  />
                </Form.Group>
              </Col>
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
                {/* <Button
                    className="mt-4"
                    variant="primary"
                    onClick={handleSubmit}
                  >
                    Confirm <FontAwesomeIcon icon={faCheckCircle} />
                  </Button> */}
                {/* {clicked == true ? ( */}
                {/* <Link to="/SelectFlight"> */}
                <Button
                  // style={{ marginLeft: "4vh" }}
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
                {/* </Link> */}
                {/* ) : null} */}
              </Col>
            </Row>
          </Form>
          <br />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};
export default EditFlight;
