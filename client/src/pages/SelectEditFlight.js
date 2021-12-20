import React from "react";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import { json } from "body-parser";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import back from "../images/back.png";
import top from "../images/top.png";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const SelectEditFlight = () => {
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  let history = useHistory();

  let flights = searchFlights.data.going;
  
   if (flights == undefined || flights[0] == undefined) {
    setTimeout(() => {
      history.push("/");
    }, 2000);
    return (
      <div>
        <Row>
          <br />
          <br />

          <Link to="/ReservationView">
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
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginLeft: "0.4cm" }}>
            <FontAwesomeIcon
              style={{ color: "red" }}
              icon={faExclamationCircle}
            />
            No Available  flights with this date{" "}
            <FontAwesomeIcon icon={faCalendarAlt} />{" "}
          </h1>
          <label>
            <i>Redirecting to Home in 2 seconds</i>
          </label>
        </div>
        <br />
      </div>
    );
  } else {
    let flights2 = searchFlights.data.returning;
    let seatType = searchFlights.data.seatType;
    let allData = { flights, flights2, seatType };


    function GetTime(date1) {
      return new Date(date1).getHours() + ":" + new Date(date1).getMinutes();
    }
    function GetDate(date1) {
      var date = new Date(date1);
      var z =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      return z;
    }
    function getTime(date1, date2) {
      var hours2 = new Date(date2).getHours();
      // console.log("hours2", hours2);
      var hours1 = new Date(date1).getHours();
      // console.log("hours", hours1);
      var minutes2 = new Date(date2).getMinutes();
      // console.log("minutes2", minutes2);

      var minutes1 = new Date(date1).getMinutes();
      // console.log("minutes1", minutes1);

      // console.log("Day:", new Date(date1).getDate());
      var hours = 0;
      var minutes = 0;
      if (minutes2 != minutes1) {
        if (minutes2 > minutes1) {
          minutes = minutes2 - minutes1;
        } else if (minutes2 < minutes1) {
          minutes = minutes2 + (60 - minutes1);
          hours1 = hours1 + 1;
        } else {
          if (minutes2 == 0) {
            minutes = minutes1;
          } else {
            minutes = minutes2;
          }
        }
      }
      if (hours2 > hours1) {
        hours = hours2 - hours1;
      } else if (hours2 == hours1) {
        hours = 0;
      } else {
        hours = 24 - hours1 + hours2;
      }
      while (minutes > 60) {
        hours = hours + 1;
        minutes = minutes - 60;
      }
      if (minutes == 60) {
        hours = hours + 1;
        minutes = minutes - 60;
      }
      var duration = hours + " hours " + minutes + " minutes";
      return duration;
    }


    const handleSelectClick = (flight) => {
      console.log("selected ", flight);
      const selected = {
        flight1: flight, // flight to be changed
        flight2:searchFlights.selected.flight2, // returnFlight Unchanged
        resId:searchFlights.selected.resId,
        which:searchFlights.selected.which,
        num: searchFlights.data.companionsCount,
        flight1seat: [],
        flight2seat: searchFlights.selected.flight2seat,
        companions: searchFlights.selected.companions,
      };

      setSearchFlights({
        ...searchFlights,
        selected: { ...searchFlights.selected, flight1: flight },
      });
    };

    return (
      <div>
        <br />
        <br />
        {/* <h2> Reservation Summary {JSON.stringify(flights)}</h2>   */}
        <div style={{display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"}}>
                  <h6 style={{color:"black"}}><Link to="/" style={{color:"black",textDecoration:"none"}}>Home Page </Link><FontAwesomeIcon style={{color:"black"}} icon={faArrowRight}/>
                 {" "} <Link to="/ReservationView" style={{color:"black",textDecoration:"none"}}>My Reservations </Link><FontAwesomeIcon icon={faArrowRight}/>
                 {" "} <Link to="/EditFlight" style={{color:"black",textDecoration:"none"}}>Search </Link><FontAwesomeIcon icon={faArrowRight}/>
                 {" "}  <b>Select Flight</b></h6>
         </div>
        <br />
        <Row>
          <Col>
            <h2 className="mx-3 mb-5">Choose Flight ✈ </h2>
          </Col>
        </Row>
        <h3 className="mx-3 mb-5">
          <div
            class="alert alert-success col-md-8 offset-md-2 my-2"
            role="alert"
          >
            The Results Of Your Search From{" "}
            {flights[0].flightDet.departureAirport} ✈{" "}
            {flights[0].flightDet.arrivalAirport}
          </div>
        </h3>
        {flights.map((flight, index) => (
          //outset
          <div
            style={{ border: "outset", transition: " 0.2s" }}
            className="card col-md-8 offset-md-2 mb-5"
          >
            <br />

            <div className=" card-body">
              <h4 class="card-title">
                Flight Number: {flight.flightDet.flightNumber}{" "}
              </h4>
              <hr style={{ color: "black", border: "5px solid" }} />
              <Row>
                <Col>
                  <h6>
                    Departure Date: {GetDate(flight.flightDet.departureTime)}
                  </h6>
                </Col>
                <Col>
                  <h6>
                    Arrival Date: {GetDate(flight.flightDet.arrivalTime)}{" "}
                  </h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>
                    Departure Time: {GetTime(flight.flightDet.departureTime)}
                  </h6>
                </Col>
                <Col>
                  <h6>Arrival Time: {GetTime(flight.flightDet.arrivalTime)}</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>Class: {seatType}</h6>
                </Col>
                <Col>
                  <h6>
                    Duration:{" "}
                    {getTime(
                      flight.flightDet.departureTime,
                      flight.flightDet.arrivalTime
                    )}
                  </h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>Baggage Allowance: 2 Bags</h6>
                </Col>
                <Col>
                  <h6>
                    Ticket Price:Adult: {flight.finalPrice}$, Child:{" "}
                    {flight.finalPrice / 2}$
                  </h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Col>
                    {/* <input id={index} onChange={firstClick(index)} class="form-check-input" type="checkbox"  value="option1"></input>
                   <label className="form-check-label mx-2" for={index}>Check to choose flight</label> */}

                    <Link
                      to={{ pathname: "/SelectEditFlightSeat", state: allData }}
                    >
                      <a
                        id={index}
                        style={{ float: "right" }}
                        class="btn btn-primary"
                        onClick={() => handleSelectClick(flight)}
                      >
                        Select Flight ✈
                      </a>
                    </Link>
                  </Col>
                </Col>
              </Row>
            </div>
          </div>
        ))}
        ;
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
      </div>
    );
  }
};

export default SelectEditFlight;
