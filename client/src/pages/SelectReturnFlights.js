import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import back from "../images/back.png";
import top from "../images/top.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SelectReturnFlights = (props) => {
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  let history = useHistory();

  //   const allData = props.location.state;
  console.log("search flight", searchFlights);
  const flight = searchFlights.data.going;
  const flights2 = searchFlights.data.returning;

  if (flights2 == undefined || flights2[0] == undefined) {
    setTimeout(() => {
      history.push("/");
    }, 5000);
    return (
      <div>
        <Row>
          <br />
          <br />

          <Link to="/SelectFlight">
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
            {" "}
            <FontAwesomeIcon
              style={{ color: "red" }}
              icon={faExclamationCircle}
            />{" "}
            No Available returning flights with this date{" "}
            <FontAwesomeIcon icon={faCalendarAlt} />
          </h1>
          <label>
            <i>Redirecting to Home in 5 seconds</i>
          </label>
          <br />
        </div>
      </div>
    );
  } else {
    const seatType = searchFlights.data.seatType;
    let allData = { flight, flights2, seatType };

    //   const flight = allData.flights;
    //   const flights2 = allData.flights2;
    //   const seatType = allData.seatType;

    console.log("allData is hereeeeeeeeeeeeeeeeeee", allData);

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
      const flight1 = searchFlights.selected.flight1;
      const selected = {
        flight1: flight1,
        flight2: flight,
        flight1seat: [],
        flight2seat: [],
        companions: searchFlights.selected.companions,
        companionNames:searchFlights.selected.companionNames

      };
      setSearchFlights({ ...searchFlights, selected });
      console.log("selectretyrjun",searchFlights);
    };
    return (
      <div>
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
            <FontAwesomeIcon icon={faArrowRight} /> <b>Select Return Flight</b>
          </h6>
        </div>
        {/* <h3>Home Page --{">"} Select Going Flight --{">"} Select Returning Flight </h3> */}
        <br />
        {/*  <h1>{allData.flights[0].flightDet.flightNumber}</h1> */}
        <Row>
          <Col>
            <h2 className="mx-3 mb-5">Choose Returning Flight ✈ </h2>
          </Col>
        </Row>
        <h3 className="mx-3 mb-5">
          <div
            class="alert alert-success col-md-8 offset-md-2 my-2"
            role="alert"
          >
            The Results Of Your Search From{" "}
            {flights2[0].flightDet.departureAirport} ✈{" "}
            {flights2[0].flightDet.arrivalAirport}
          </div>
        </h3>
        {flights2.map((flight) => (
          //outset
          <div
            style={{ border: "outset", transition: " 0.2s" }}
            className="card col-md-8 offset-md-2 mb-5"
          >
            <br />

            <div className=" card-body">
              <h4 class="card-title">
                Flight Number: {flight.flightDet.flightNumber}
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
                    Ticket Price: Adult: {flight.finalPrice}$, Child:{" "}
                    {flight.finalPrice / 2}$
                  </h6>
                  {/* <h6>Child Ticket Price: {flight.finalPrice} $</h6> */}
                </Col>
              </Row>
              <Col>
                <Link to={{ pathname: "/SeatReservation", state: allData }}>
                  <a
                    style={{ float: "right" }}
                    class="btn btn-primary"
                    onClick={() => handleSelectClick(flight)}
                  >
                    Select Flight ✈
                  </a>
                </Link>
              </Col>
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
export default SelectReturnFlights;
