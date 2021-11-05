import { React, useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Form, ListGroup, Row, Col, Card, Button } from "react-bootstrap";
import { Redirect, Switch, Route, useParams } from "react-router-dom";
import FlightService from "../Services/FlightService";
// you can use ActivityView = ({match}) instead
const FlightView = (props) => {
  let { flightId } = useParams();
  console.log("fligth id from url", flightId);
  const [flightInfo, setflightInfo] = useState({});

  /* const handleDelete =  e => {
    e.preventDefault();
    FlightService.DeleteFlightWithFlNo({ flightId: flightId })
      .then((response) => {
        console.log("Success ========>", response);
        setflightInfo(response.data);
      })
      .catch((err) => console.log("Error ===<", err));
  } */

  const handleUpdate =  e => {
    e.preventDefault();
    FlightService.updateFlight({ flightId: flightId })
      .then((response) => {
        console.log("Success ========>", response);
        setflightInfo(response.data);
      })
      .catch((err) => console.log("Error ===<", err));

  }
  //const handleBtnClick = () => {
  //  setPopupOpen(true);
  //};

  const confirmation = (data) => {
    console.log("data", data);
    const resp = window.confirm("Are you sure you want to delete", "");
    if(resp){
    FlightService.DeleteFlight(data)
      .then((res) => {
        console.log("OK ===> ", res); 
        //this.props.history.push('/');
      })
      .catch((err) => {
        console.log("errr <===", err.response);
        const errorMessage = err.response.data;
  
      });
     
    }
  } 

  const handleDelete = (e) => {
    e.preventDefault();
    
    // datetime example "2016-05-18T16:00:00Z"
    const data = {
      flightNumber: flightNumber,
      redirectTo: "FlightList"
    };
    confirmation(data);

   
  };

  useEffect(() => {
    console.log("sending ?");
    console.log(flightId);
    FlightService.GetInfo({ flightId: flightId })
      .then((response) => {
        console.log("Success ========>", response);
        setflightInfo(response.data);
      })
      .catch((err) => console.log("Error ===<", err));
  }, []);
  // }

  
  let {
    flightNumber,
    arrivalTime,
    departureTime,
    economySeatsNum,
    businessSeatsNum,
    firstSeatsNum,
    departureAirport,
    arrivalAirport,
    firstClassPrice,
    economyClassPrice,
    businessClassPrice,
  } = flightInfo;
  return (
    <>
      <div className="container my-4">
          <h1>{flightNumber}</h1>
          <h1>{arrivalTime}</h1>
          
          
          <h1>{departureTime}</h1>
          <h1>{economySeatsNum}</h1>
          <h1>{businessSeatsNum}</h1>
          <h1>{firstSeatsNum}</h1>
          <h1>{departureAirport}</h1>
          <h1>{arrivalAirport}</h1>
          <h1>{firstClassPrice}</h1>
          <h1>{economyClassPrice}</h1>
          <h1>{businessClassPrice}</h1>
          <Row className="mb-2">
          <button className="btn btn-primary col-2 offset-4" onClick={handleUpdate}>
            Update Flight
          </button>
          <button className="btn btn-danger col-2 mx-4" onClick={handleDelete}>
            Delete Flight
          </button>
          </Row>
         
        </div>
    </>
  );
};

export default FlightView;
