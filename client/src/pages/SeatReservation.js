import { useEffect, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import PlaneSelection from "../Components/PlanSelection.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
<<<<<<< HEAD
import seat from "../images/seat.png";
=======
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
>>>>>>> 7e1cb81dc616dcbc1b0dcfc867593f96e3ef91fd

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
        alert("You can only select one seat in each flight");
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
<<<<<<< HEAD
    if (selectedFlight2.length === 0 || selectedFlight2.length < numSeatSelected) {
      alert("Please select your specified number of seats which is :" + " " + numSeatSelected + "seats");
      return;
    }
    setSearchFlights({
      ...searchFlights,
      selected: {
        ...searchFlights.selected,
        flight1seat: selectedFlight1,
        flight2seat: selectedFlight2,
        companions:searchFlights.selected.companions
      },
    });
=======

    // the seats are selected while clicking

>>>>>>> 7e1cb81dc616dcbc1b0dcfc867593f96e3ef91fd
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
<<<<<<< HEAD
    <Row>
        <Col><h2 className="mx-5 mb-5 mt-3">Choose Your ✈ Seats <img style={{height:"1cm",width:"1cm"}} src={seat}/> </h2> 

=======
     <Row>
        <Col><h2 className="mx-5 mb-5 mt-3">Choose Your ✈ Seats <img style={{height:"1cm",width:"1cm"}} src="https://images-ext-2.discordapp.net/external/A42A2v3dW1SRgtRFrnBoA3oUJ0_L14kc99FacMmCCu8/%3Ftoken%3Dexp%3D1638227280~hmac%3D1c6a9c3d223ab6e29d22e8429ed9a642/https/cdn-icons.flaticon.com/png/512/4110/premium/4110361.png?width=270&height=270" /> </h2> 
       
>>>>>>> 7e1cb81dc616dcbc1b0dcfc867593f96e3ef91fd
        </Col>
        <Col><Link to="/SelectReturnFlights">
        <button style={{float:"right", marginRight:"13rem"}} class="btn btn-primary mb-5 mt-3">Back To The Previous Page</button>
        </Link></Col>
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