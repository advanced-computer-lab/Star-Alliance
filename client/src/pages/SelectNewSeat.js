import { useEffect, useContext, useState } from "react";
import { Children, useRef } from "react";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import PlaneSelection from "../Components/PlanSelection.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import PopupView from "../Components/PopupView";

import { useHistory } from "react-router-dom";
import seat from "../images/seat.png";
import back from "../images/back.png";
import top from "../images/top.png";
import ReservationService from "../Services/ReservationService.js";
import { UserCtx } from "../Context/GlobalContext";

const assert = require("assert");

const SelectNewSeat = (props) => {
  let history = useHistory();

  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  const [flight1seatSt, setflight1seatSt] = useState([]);
  const [loadingConfirm, setloadingConfirm] = useState(false);
  const [popupOpen, setpopupOpen] = useState(false);
  const [popupChild, setpopupChild] = useState(null);
  const popupCloseCBref = useRef(null);
  const [User, setUser] = useContext(UserCtx);

  console.log("search flight in seat reservation", searchFlights);

  
    const flight1 = searchFlights.oldReservation.reservDet.EditedFlight;

    const userCabinClass = searchFlights.oldReservation.reservDet.cabin;
    const numSeatSelected =
    parseInt(searchFlights.oldReservation.reservDet.companions.adultCount) +
    parseInt(searchFlights.oldReservation.reservDet.companions.childCount);


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

    
    const handleConfirmBtn = () => {
        const resp = window.confirm("Are you sure you want to Change your seat?", "");
        if(!resp) return;
        setloadingConfirm(true);
        let data = {     
          userId: User.id, 
          flight1num:searchFlights.oldReservation.reservDet.EditedFlightNum,
          flight2Id: searchFlights.oldReservation.reservDet.unEditedFlightID,
          seatType: searchFlights.oldReservation.reservDet.cabin,
          flight1seat:flight1seatSt,
          flight2seat:searchFlights.oldReservation.reservDet.flight2Seats,
          companions: {
            adultCount: parseInt(searchFlights.oldReservation.reservDet.companions.adultCount),
            childCount: parseInt(searchFlights.oldReservation.reservDet.companions.childCount),
          },
          resId:searchFlights.oldReservation.reservDet.reservationID,
          which:searchFlights.oldReservation.reservDet.which
        };
        ReservationService.reserveNewFlight(data)
          .then((res) => {
            console.log("res", res);
            const bookingNumber =searchFlights.oldReservation.reservDet.reservationID;
            console.log("OK ===> ", bookingNumber);
  
            setloadingConfirm(false);
            console.log("here i am")

            popupCloseCBref.current = () => {
              console.log("here i am2")

              history.push("/");
              console.log("here i am3")

            };
            setpopupChild(
              <>
                <h2>Your Seats has been Updated</h2>
                <h2> Booking Number:</h2>
                <h2>{bookingNumber}</h2>
              </>
            );
            setpopupOpen(true);
          })
          .catch((err) => {
            // alert("Error", err);
            console.log("errr <===", err.response);
            const errorMessage = err.response.data;
            // console.log("errorMessage", errorMessage);
            alert("Error: " + errorMessage);
          });
      };

    return (
      <>
        <br />
        <br />
        <Row>
          <br />
          <Link to="/SelectEditFlight">
            <img
              style={{
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
        <Row>
          <Col>
            <h2 className="mx-5 mb-5 mt-3">
              Choose Your Seats{" "}
              <img style={{ height: "1cm", width: "1cm" }} src={seat} />{" "}
            </h2>
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
              From {flight1.departureAirport} ✈{" "}
              {flight1.arrivalAirport}
            </h3>
            <PlaneSelection
              seatClick={seatClick1}
              id={0}
              availableSeats={flight1.availableSeats}
              userCabinClass={userCabinClass}
              checkedSeates={flight1seatSt}
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
            Change Seat <FontAwesomeIcon icon={faCheckCircle} />
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
        <PopupView
          showDialog={popupOpen}
          setshowDialog={setpopupOpen}
          cancelCB={popupCloseCBref.current}
        >
          {popupChild}
        </PopupView>
      </>
    );
  
};

export default SelectNewSeat;
