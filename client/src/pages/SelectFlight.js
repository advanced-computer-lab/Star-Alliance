import React from "react";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import { json } from "body-parser";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";


const SelectFlight = () => {
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);

  let flights = searchFlights.data.going;
  if (searchFlights.data.CheckCountry == "1") {
    return (
      <h1>
        <FontAwesomeIcon icon={faStickyNote} /> Note:You must choose a
        destination different than departure !
      </h1>
    );
  } else if (flights==undefined||flights[0] == undefined) {
    return( 
      <div>
      <h1>No Available Going flights with this date !</h1>
      <br/>
      <Link to="/">
      <button style={{float:"left", marginRight:"8rem"}} class="btn btn-primary">Back To Home Page</button>
      </Link>    </div>    );
  } else {
    let flights2 = searchFlights.data.returning;
    let seatType = searchFlights.data.seatType;
    let allData = { flights, flights2, seatType };

    const firstClick = (ids) => {
      // console.log("Check", ids);
      //var property = document.getElementById(ids);
      //if(property !=null){
      // property.style.backgroundColor = "green";
      // console.log("choosen flight", flights[ids]);
    };

    //console.log(flights[0].finalPrice);
    //console.log("testing",searchFlights.data.going);
    //}

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
      if (minutes2 > 0 || minutes > 0) {
        minutes = minutes2 + (60 - minutes1);
      } else {
        if (minutes2 == 0) {
          minutes = minutes1;
        } else {
          minutes = minutes2;
        }
      }
      if (hours2 > hours1) {
        hours = hours2 - hours1;
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

    // console.log("flight here--------------",flights);
    /*const  state  = window.props;
    console.log("----------------------------------------",window.props);
*/

  const handleSelectClick = (flight) => {
    console.log("selected ", flight);
    const selected = {
      flight1: flight,
      flight2: null,  // to be changed in Select Return Flight
      num:searchFlights.data.companionsCount,
      flight1seat:[],
        flight2seat:[],
        companions:searchFlights.selected.companions
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
      <Row>

      <br/>
      <Link to="/">
             <img style={{marginLeft:"0.4cm" ,float:"left",height:"40px",width:"40px"}} src="https://cdn-icons.flaticon.com/png/128/3236/premium/3236910.png?token=exp=1638369412~hmac=356ff9332a1a76f20d437d6f259bca7b" />
      </Link>
      </Row>
      <br/>

      <Row>
      <Col><h2 className="mx-3 mb-5">Choose Going Flight ✈ </h2></Col>
      </Row>
      <h3 className="mx-3 mb-5">
      <div class="alert alert-success col-md-8 offset-md-2 my-2" role="alert">
        The Results Of Your Search From {flights[0].flightDet.departureAirport} ✈{" "}
        {flights[0].flightDet.arrivalAirport}
      </div>
       
      </h3>
      {flights.map((flight, index) => (
        //outset
        <div
          style={{ border: "outset" }}
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
                      to={{ pathname: "/SelectReturnFlights", state: allData }}
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
      </div>
    );
  }

};

export default SelectFlight;
