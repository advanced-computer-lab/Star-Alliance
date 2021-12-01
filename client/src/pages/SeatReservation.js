import { useEffect, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import PlaneSelection from "../Components/PlanSelection.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import seat from "../images/seat.png";

const assert = require("assert");

const SeatReservation = (props) => {
  let history = useHistory();

  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  const [flight1seatSt, setflight1seatSt] = useState([]);
  const [flight2seatSt, setflight2seatSt] = useState([]);

  console.log("search flight in seat reservation", searchFlights);

  if (searchFlights.data == "inital not set data") {
    return (
      <div>
        <h1>No Available Seats !</h1>
        <br />
        <Link to="/">
          <button
            style={{ float: "left", marginRight: "8rem" }}
            class="btn btn-primary"
          >
            Back To Home Page
          </button>
        </Link>{" "}
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
        <Row>
          <Col>
            <h2 className="mx-5 mb-5 mt-3">
              Choose Your ✈ Seats{" "}
              <img style={{ height: "1cm", width: "1cm" }} src={seat} />{" "}
            </h2>
          </Col>
          <Col>
            <Link to="/SelectReturnFlights">
              <button
                style={{ float: "right", marginRight: "8rem" }}
                class="btn btn-primary"
              >
                Back To The Previous Page
              </button>
            </Link>
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <h3 className="mx-3 mb-4">
              From {flight1.flightDet.departureAirport} to{" "}
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
          <div>
            <h3 className="mx-3 mb-4">
              {" "}
              From {flight2.flightDet.departureAirport} to{" "}
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
            Confirm Seats
          </Button>
        </div>
      </>
    );
  }
};

export default SeatReservation;
