import React from "react";
import { UserHomeCtx } from "../Context/UserHomeContext";

import ReservationService from "../Services/ReservationService.js";
const successfulPayment = () => {
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
    const searchFlights = JSON.parse(localStorage.getItem('reservation'));
    console.log("to confirm the reservation", searchFlights);

    const flight1 = searchFlights.selected.flight1;
    const flight2 = searchFlights.selected.flight2;
    //console.log("a5ls", searchFlights);
    const flight3seat = searchFlights.selected.flight1seat.join(",");
    const flight4seat = searchFlights.selected.flight2seat.join(",");
    const flight1seat = searchFlights.selected.flight1seat;
    const flight2seat = searchFlights.selected.flight2seat;
    //console.log("testing", searchFlights);
    const flight1totalPrice =
      searchFlights.selected.companions.adultCount * flight1.finalPrice +
      searchFlights.selected.companions.childCount * (0.5 * flight1.finalPrice);
    const flight2totalPrice =
      searchFlights.selected.companions.adultCount * flight2.finalPrice +
      searchFlights.selected.companions.childCount * (0.5 * flight2.finalPrice);
    const totalPrice = flight1totalPrice + flight2totalPrice;

    let data = {
        userId: "61a35fcdfd33ed54997b5271", // TODO: new Reservation dynmaic user
        flight1num: flight1.flightDet.flightNumber,
        flight2num: flight2.flightDet.flightNumber,
        seatType: searchFlights.data.seatType,
        flight1seat: flight1seat,
        flight2seat: flight2seat,
        companions: searchFlights.selected.companions,
      };
      ReservationService.reserveNew(data)
        .then((res) => {
          console.log("res", res);
          const bookingNumber = res.data.bookingNumber;
          console.log("OK ===> ", res);
         
           /*alert(
             `Your Flights has been Reserved, Booking Number ${bookingNumber}`,
             res
           );*/
        })
        .catch((err) => {
          // alert("Error", err);
          console.log("errr <===", err.response);
          const errorMessage = err.response.data;
          // console.log("errorMessage", errorMessage);
          alert("Error: " + errorMessage);
        });

    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1>Success page</h1>
        </div>
    );

}
export default successfulPayment;