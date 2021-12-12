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
        arrivalAirport: searchFlights.data.OldReservation.arrivalAirport,
        departureAirport: searchFlights.data.OldReservation.departureAirport,
        children:  parseInt(searchFlights.OldReservation.reservDet.companions.childCount),
        adult: parseInt(searchFlights.OldReservation.reservDet.companions.adultCount),
      };
      console.log(data);
  
      FlightService.GetRequestedFlights(data).then(({ data }) => {
        const selected = {
        resId:searchFlights.OldReservation._id,
          flight1: null,
         // resId:"61b0f38d9e2b3fbe0af3ac3e",
          //flight2:"61a79d30e6a68e5a4354ac12",
          flight2:searchFlights.OldReservation.flight2, 
          flight1seat: [],
          //flight2seat:["3D"],
          //which:"flight2",
          which:searchFlights.which,
          flight2seat:searchFlights.OldReservation.fligh2seats ,
          companions: {
            adultCount: parseInt(searchFlights.OldReservation.reservDet.companions.adultCount),
            childCount: parseInt(searchFlights.OldReservation.reservDet.companions.childCount),
          },
        };
        setSearchFlights({ data, selected });
        console.log("gigi", searchFlights);
        show();
        console.log(clicked);
        history.push("/SelectEditFlight");
      });
    };
    return (
      <div 
        className="mt-1  "
        id="testing"
        style={{ fontFamily: "cursive", color: "white" }}
      >
      <br/>
           <br/>
           <br/>
           <br/>
        <div 
          className=" mt-5 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2 " //
          style={{
            borderRadius: "2rem",
            backgroundColor: "#112D4E",
            height: "auto",
          }}
        >
         
        
          <div  style={{height: "auto"}} className=" col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-10 offset-lg-1 ">
          

            <Form ref={formRef}>
              <Row >
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
            <br/>
          </div>
        </div>
        <br/>
        <br/>
       
      </div>
    );
  };
  export default EditFlight;
  