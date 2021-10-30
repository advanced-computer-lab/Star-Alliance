import { React, useState, useEffect, createRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Nav, NavDropdown, Link } from "react-bootstrap";
//import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

import FlightService from "../Services/FlightService";

const updateFormRef = createRef();

const handleSubmit = (e) => {
  e.preventDefault();
  const flNumber = e.target.flNumber.value;
  const flArrivalTime = e.target.flArrivalTime.value;
  const flDepartureTime = e.target.flDepartureTime.value;
  const flEconomySeatsNum = e.target.flEconomySeatsNum.value;
  const flBusinessSeatNum = e.target.flBusinessSeatNum.value;
  const flFirstSeatNum = e.target.flFirstSeatNum.value;
  const flDepartureAirport = e.target.flDepartureAirport.value;
  const flArrivalAirport = e.target.flArrivalAirport.value;
  const flPrice = e.target.flPrice.value;

  // datetime example "2016-05-18T16:00:00Z"
  const data = {
    flightNumber: flNumber,
    arrivalTime: flArrivalTime,
    departureTime: flDepartureTime,
    economySeatsNum: flEconomySeatsNum,
    businessSeatsNum: flBusinessSeatNum,
    firstSeatsNum: flFirstSeatNum,
    departureAirport: flDepartureAirport,
    arrivalAirport: flArrivalAirport,
    price: flPrice,
  };

  console.log("data", data);

  FlightService.updateFlight(data)
    .then((res) => {
      console.log("OK ===> ", res);
    })
    .catch((err) => {
      console.log("errr <===", err);
    });
  // BadgeService.editBadge({ id, name, desc, points, type, disabled })
  //   .then((res) => {
  //     console.log("success ==> ", res.data);
  //     // alert("done");
  //     popUpAlert("Done");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     popUpAlert("Something Went Wrong");
  //   });
};

const UpdateForm = () => {
  return (
    <>
    <br></br>
    <br></br>
    <br></br>

      <Form ref={updateFormRef} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Flight Number</Form.Label>
          <Form.Control
            name="flNumber"
            type="number"
            placeholder="Enter Flight Number"
          />

          <Form.Label>Arrival Time</Form.Label>
          <Form.Control
            name="flArrivalTime"
            type="datetime-local"
            placeholder="Enter Arrival Number"
          />
          <Form.Label>Departure Time</Form.Label>
          <Form.Control
            name="flDepartureTime"
            type="datetime-local"
            placeholder="Enter Departure Time"
          />

          <Form.Label>Economy Seats Number</Form.Label>
          <Form.Control
            name="flEconomySeatsNum"
            type="number"
            placeholder="Enter Economy Seats Number"
          />

          <Form.Label>Business Seat Numbers</Form.Label>
          <Form.Control
            name="flBusinessSeatNum"
            type="number"
            placeholder="Enter Business Seat Numbers "
          />

          <Form.Label>First Seats Number</Form.Label>
          <Form.Control
            name="flFirstSeatNum"
            type="number"
            placeholder="Enter Economy Seats Number"
          />

          <Form.Label>Departure Airport</Form.Label>
          <Form.Control
            name="flDepartureAirport"
            type="string"
            placeholder="Please Enter the Departure Airport"
          />

          <Form.Label>Arrival Airport</Form.Label>
          <Form.Control
            name="flArrivalAirport"
            type="string"
            placeholder="Please Enter the Arival Airport"
          />
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="flPrice"
            type="number"
            placeholder="Please Enter the price"
          />
          <Button variant="primary" type="submit">
            Update Flight
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

// "economySeatsNum": 3,
// "businessSeatsNum": 5,
// "firstSeatsNum": 4,
// "departureAirport": "cairo",
// "arrivalAirport": "jedda",
// "price": 1

export default UpdateForm;
