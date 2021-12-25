import { useContext, useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
const ContinueReservingBar = (props) => {
  const history = useHistory();
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  var showThis = false;
  var goToLocation = useRef("");
  const [, forceRefresh] = useState(null);
  var displayData = null;
  // data => SelectFlight
  // selected.
  // 	flight1 => SelectReturnFlights
  // 	flight2 => SeatReservation
  // 	fligh1seat && flight2seat => ReservationSummary
  const {
    data,
    selected: { flight1, flight2, flight1seat, flight2seat },
  } = searchFlights;
  if (data && data?.going?.length > 0 && data?.returning?.length > 0) {
    displayData = {
      from: data.going[0].flightDet.departureAirport,
      to: data.going[0].flightDet.arrivalAirport,
    };
    goToLocation = "/SelectFlight";
    showThis = true;
  }
  if (flight1) {
    goToLocation = "/SelectReturnFlights";
    showThis = true;
  }
  if (flight2) {
    goToLocation = "/SeatReservation";
    showThis = true;
  }
  if (flight1seat.length > 0 && flight2seat.length > 0) {
    goToLocation = "/ReservationSummary";
    showThis = true;
  }
  if((searchFlights.confirmed)){
    showThis = false;
  } 

  //   const handleClick = () => {
  //     history.push(goToLocation); 
  //   };
  const handleClickDelete = () => {
    setSearchFlights({
      ...searchFlights,
      data: "",
      selected: {
        flight1: null,
        flight2: null,
        flight1seat: [],
        flight2seat: [],
        companions: {
          adultCount: 0,
          childCount: 0,
        },
      },
    });
    forceRefresh({});
  };

  if (!showThis) return null;

  return (
    <>
      <div 
      className="col-8 offset-2 mt-3"
        style={{
          display: "flex",
          padding: "1rem",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#eeeeee",
          color: "#000000",
        }}
      >
        <Link to={goToLocation}>
          {displayData &&
            "Continue your reserving From " +
              displayData.from +
              " To " +
              displayData.to}
        </Link>
        {/* <Button onClick={handleClick} variant="primary">
		{displayData &&
            "Continue your reserving From " +
              displayData.from +
              " To " +
              displayData.to}
        </Button> */}
        <Button
          style={{ marginLeft: "1rem" }}
          variant="outline-primary"
          onClick={handleClickDelete}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </Button>
      </div>
    </>
  );
};

export default ContinueReservingBar;
