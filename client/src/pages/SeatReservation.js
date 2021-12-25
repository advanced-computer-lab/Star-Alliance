import { useEffect, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import PlaneSelection from "../Components/PlanSelection.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom";
import seat from "../images/seat.png";
import back from "../images/back.png";
import top from "../images/top.png";
import UserService from "../Services/UserService";

const assert = require("assert");

const SeatReservation = (props) => {
  let history = useHistory();

  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  const [flight1seatSt, setflight1seatSt] = useState([]);
  const [flight2seatSt, setflight2seatSt] = useState([]);

  // This page is not allowed for Guests. if its a Guest, redirect to summary page
  if (UserService.isGuest()) {
    history.push("/ReservationSummary");
    return null; // make sure nothing redered
  }

  console.log("search flight in seat reservation", searchFlights);

  if (searchFlights.data == "inital not set data") {
    setTimeout(() => {
      history.push("/");
    }, 5000);
    return (
      <div>
        <Row>
          <Link to="/">
            <img
              style={{
                marginTop: "0.5cm",
                marginLeft: "0.4cm",
                float: "left",
                height: "50px",
                width: "50px",
              }}
              src={back}
            />
          </Link>
        </Row>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginLeft: "0.4cm" }}>
            {"  "}
            <FontAwesomeIcon
              style={{ color: "red" }}
              icon={faExclamationCircle}
            />
            No Available seats{" "}
            <img style={{ height: "50px", width: "50px" }} src={seat} />
          </h1>
          <label>
            <i>Redirecting to Home in 5 seconds</i>
          </label>
        </div>
        <br />
      </div>
    );
  } else {
    const flight1 = searchFlights.selected.flight1;
    const flight2 = searchFlights.selected.flight2;
    // const flight1seat = searchFlights.selected.flight1seat;
    // const flight2seat = searchFlights.selected.flight2seat;

    const userCabinClass = searchFlights.data.seatType;
    const numSeatSelected =
      searchFlights.selected.companions.adultCount +
      searchFlights.selected.companions.childCount;

    // const updateChecked = (globalId) => {
    //   const ltrs = ["A", "B", "C", "D", "E", "F"];
    //   for (let i = 1; i <= 10; i++) {
    //     for (let j = 0; j < 6; j++) {
    //       const seatId = `${i}${ltrs[j]}${globalId}`;
    //       const seats = globalId === 1 ? flight2seat : flight1seat;
    //       const seatRaw = `${i}${ltrs[j]}`;
    //       console.log("flight1seat", flight1seat);
    //       console.log("raw id", seatRaw);
    //       console.log("found in seats ?", seats.includes(seatRaw));
    //       console.log("==========");
    //       if (document.getElementById(seatId) == null) continue;
    //       document.getElementById(seatId).checked = seats.includes(seatRaw)
    //         ? true
    //         : false;
    //     }
    //   }
    // };
    // useEffect(() => {
    //   updateChecked(0);
    // }, []);

    function seatClick1(e) {
      const isChecked = e.target.checked;
      const seatID = e.target.id.substring(0, e.target.id.length - 1); //remove planeId from the seat id
      console.log("checked", isChecked, "seatId", seatID);

      if (isChecked) {
        if (flight1seatSt.length === numSeatSelected) {
          alert(
            "You can only select " + numSeatSelected + " seat(s) in each flight"
          );
          e.target.checked = false;
          return;
        }
        e.target.checked = true;
        flight1seatSt.push(seatID);
      } else {
        flight1seatSt.splice(flight1seatSt.indexOf(seatID), 1); // remove the seat from the array first then uncheck, b/c the planeselection checked depends on the array
        e.target.checked = false;
      }
      console.log("flight1seatSt", flight1seatSt);
      // updateChecked(0);
      // console.log("selected seats 1", flight1seat);
    }

    function seatClick2(e) {
      const isChecked = e.target.checked;
      const seatID = e.target.id.substring(0, e.target.id.length - 1); //remove planeId from the seat id

      if (isChecked) {
        if (flight2seatSt.length === numSeatSelected) {
          alert(
            "You can only select " + numSeatSelected + " seat(s) in each flight"
          );
          e.target.checked = false;
          return;
        }
        e.target.checked = true;
        flight2seatSt.push(seatID);
      } else {
        flight2seatSt.splice(flight2seatSt.indexOf(seatID), 1); // remove the seat from the array first then uncheck, b/c the planeselection checked depends on the array
        e.target.checked = false;
      }
      // console.log("selected seats 2", flight2seatSt);
    }

    const handleConfirmBtn = () => {
      if (
        flight1seatSt.length < numSeatSelected ||
        flight2seatSt.length < numSeatSelected
      ) {
        alert(
          "Please select your specified number of seat(s) which is : " +
            numSeatSelected +
            " seat(s)"
        );
        return;
      }

      // the seats are selected while clicking
      // no, here
      setSearchFlights({
        ...searchFlights,
        selected: {
          ...searchFlights.selected,
          flight1seat: flight1seatSt,
          flight2seat: flight2seatSt,
        },
      });

      console.log("searchFlights", searchFlights);
      history.push("/ReservationSummary");
    };
    //   arrivalAirport: "JFK"
    // arrivalTerminal: "JFK"
    // arrivalTime: "2022-01-01T10:00:00.000Z"
    // businessClassPrice: 2222
    // businessSeatsNum: 5
    // departureAirport: "LAX"
    // departureTerminal: "LAX"
    // departureTime: "2022-01-01T08:00:00.000Z"
    // economyClassPrice: 2222
    // economySeatsNum: 6
    // firstClassPrice: 3333
    // firstSeatsNum: 6
    // flightNumber: "456"
    return (
      <>
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
          <h6>
            {" "}
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              Home Page
            </Link>{" "}
            <FontAwesomeIcon icon={faArrowRight} />
            <Link
              to="/SelectFlight"
              style={{ color: "black", textDecoration: "none" }}
            >
              {" "}
              Select Flight{" "}
            </Link>
            <FontAwesomeIcon icon={faArrowRight} />
            <Link
              to="/SelectReturnFlights"
              style={{ color: "black", textDecoration: "none" }}
            >
              {" "}
              Select Return Flight{" "}
            </Link>
            <FontAwesomeIcon icon={faArrowRight} />
            <b>Select Seats</b>
          </h6>
        </div>
        <br />
        <Row >
          <Col>
            <h2 className="mx-5 mb-5 mt-3">
              Choose Your Seats{" "}
              <img style={{ height: "1cm", width: "1cm" }} src={seat} />{" "}
            </h2>
          </Col>
        </Row >
        <div
         
        >
          <Row>
          <Col>
          <div >
            <h3 className="mx-3 mb-4">
              From {flight1.flightDet.departureAirport} ✈{" "}
              {flight1.flightDet.arrivalAirport}
            </h3>
            <PlaneSelection
              seatClick={seatClick1}
              id={0}
              availableSeats={flight1.flightDet.availableSeats}
              userCabinClass={userCabinClass}
              checkedSeates={flight1seatSt}
            />
          </div>
         </Col>
          <Col>
       
          <div>
            <h3 className="mx-3 mb-4">
              {" "}
              From {flight2.flightDet.departureAirport} ✈{" "}
              {flight2.flightDet.arrivalAirport}
            </h3>
            <PlaneSelection
              seatClick={seatClick2}
              id={1}
              availableSeats={flight2.flightDet.availableSeats}
              userCabinClass={userCabinClass}
              checkedSeates={flight2seatSt}
            />
          </div>
          </Col>
          </Row>
        </div>
        <div
          className="mx-3 mb-4"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <Button variant="primary" type="confirm" onClick={handleConfirmBtn}>
            Confirm Seat(s) <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </div>
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
      </>
    );
  }
};

export default SeatReservation;
