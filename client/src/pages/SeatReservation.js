import { useEffect, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { UserHomeCtx } from "../Context/UserHomeContext";
import PlaneSelection from "../Components/PlanSelection.js";
import { useHistory } from "react-router-dom";

const assert = require("assert");

const SeatReservation = (props) => {
  let history = useHistory();
  //allData = {flights,flights2,seatType}
  //flights={flightDet:{flight details}, finalPrice}
  // const { flights, flights2, seatType } = props.location.state;
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  console.log("search flights in seating", searchFlights);
  // const flights = searchFlights.data.going;
  // const flights2 = searchFlights.data.returning;
  // const seatType = searchFlights.data.seatType;

  const flight1 = searchFlights.selected.flight1;
  const flight2 = searchFlights.selected.flight2;
  const flight1seat = searchFlights.selected.flight1seat;
  const flight2seat = searchFlights.selected.flight2seat;
  const numSeatSelected =
    searchFlights.selected.companions.adultCount +
    searchFlights.selected.companions.childCount;

  function seatClick1(e) {
    const isChecked = e.target.checked;
    const seatID = e.target.id.substring(0, e.target.id.length - 1); //remove planeId from the seat id

    if (isChecked) {
      if (flight1seat.length === numSeatSelected) {
        alert(
          "You can only select " + numSeatSelected + " seats in each flight"
        );
        e.target.checked = false;
        return;
      }
      flight1seat.push(seatID);
    } else {
      flight1seat.splice(flight1seat.indexOf(seatID), 1);
    }
    // console.log("selected seats 1", flight1seat);
  }

  function seatClick2(e) {
    const isChecked = e.target.checked;
    const seatID = e.target.id.substring(0, e.target.id.length - 1); //remove planeId from the seat id

    if (isChecked) {
      if (flight2seat.length === numSeatSelected) {
        alert(
          "You can only select " + numSeatSelected + " seats in each flight"
        );
        e.target.checked = false;
        return;
      }
      flight2seat.push(seatID);
    } else {
      flight2seat.splice(flight2seat.indexOf(seatID), 1);
    }
    // console.log("selected seats 2", flight2seat);
  }

  const handleConfirmBtn = () => {
    if (
      flight1seat.length < numSeatSelected ||
      flight2seat.length < numSeatSelected
    ) {
      alert(
        "Please select your specified number of seats which is : " +
          numSeatSelected +
          " seats"
      );
      return;
    }

    // the seats are selected while clicking

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
            avaiableSeats={flight1.flightDet.avaiableSeats}
            selectedSeats={flight1seat}
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
            avaiableSeats={flight2.flightDet.avaiableSeats}
            selectedSeats={flight2seat}
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
};

export default SeatReservation;
