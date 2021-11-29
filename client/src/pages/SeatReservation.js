import { useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { UserHomeCtx } from "../Context/UserHomeContext";
// import "../Styles/Seats.scss";
import PlaneSelection from "../Components/PlanSelection.js";
var selectedSeats = []; // this array contains the ids of the selected seats forex ["1A", "2B", "3C"]

const SeatReservation = (props) => {
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

  function seatClick1(e) {
    const isChecked = e.target.checked;
    console.log("isChecked seat 1", isChecked);
    const seatID = e.target.id;
    if (isChecked) selectedSeats.push(seatID);
    else selectedSeats.splice(selectedSeats.indexOf(seatID), 1);
    console.log(selectedSeats);
  }

  function seatClick2(e) {
    const isChecked = e.target.checked;
    console.log("isChecked seat 2", isChecked);
    const seatID = e.target.id;
    if (isChecked) selectedSeats.push(seatID);
    else selectedSeats.splice(selectedSeats.indexOf(seatID), 1);
    console.log(selectedSeats);
  }

  const handleConfirmBtn = () => {};
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
