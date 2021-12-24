import {useContext, useEffect, useRef} from "react";
import { UserHomeCtx } from "../Context/UserHomeContext";
import UserService, { UserCtx } from "../Services/UserService.js";
import { Alert } from "@mui/material";

import ReservationService from "../Services/ReservationService.js";
const Refund = () => {
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  const ref = useRef(0); 
  console.log("search Flightssssss",searchFlights);
  const [user, setUser] = useContext(UserCtx);
  //const searchFlights = JSON.parse(localStorage.getItem('reservation'));
  //console.log("to confirm the reservation", searchFlights);
  useEffect(() => {
   
    let userID = user.id;
   
    let data = {// TODO: new Reservation dynmaic user
        reservationId: searchFlights.selected.resId
      };
      ReservationService.reserveRefund(data)
        .then((res) => {
          console.log("res", res);
           // setBookingNumber(res.data.bookingNumber);
           ref.current = res.data.bookingNumber;
           console.log(ref);
          console.log("OK ===> ", res);
          setSearchFlights({
            ...searchFlights,
            selected: {
              ...searchFlights.selected},
            confirmed: "true", 
          });
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
      
      if(searchFlights.toBeEdited === true){
        let userID = user.id;
        const flight1 = searchFlights.selected.flight1;
        const flight3seat = searchFlights.selected.flight1seat.join(",");
        const flight1seat = searchFlights.selected.flight1seat;
        const flight1totalPrice =
          searchFlights.selected.companions.adultCount * flight1.finalPrice +
          searchFlights.selected.companions.childCount * (0.5 * flight1.finalPrice);
        const totalPrice = flight1totalPrice ;

        let data = {
          userId: userID, // TODO: new Reservation dynmaic user
          flight1num: flight1.flightDet.flightNumber,
          flight2Id: searchFlights.selected.flight2Id,
          seatType: searchFlights.data.seatType,
          flight1seat: flight1seat,
          flight2seat:searchFlights.selected.flight2seat,
          companions: searchFlights.selected.companions,
          resId:searchFlights.selected.resId,
          which:searchFlights.selected.which,
          editingseat:false
        };
        ReservationService.reserveNewFlight(data)
          .then((res) => {
            let reservationId=res.data.bookingNumber;
            // setBookingNumber(res.data.bookingNumber);
            ref.current = res.data.bookingNumber;
            console.log(ref);
 
           console.log("OK ===> ", res);
           setSearchFlights({
             ...searchFlights,
             reservationId: res.data.bookingNumber,
             confirmed: "true", 
           });
           
           const data1 = {
           reservationId: reservationId,
           payment_intent: searchFlights.payment_intent
         };

        })
         .catch((err) => {
           // alert("Error", err);
           console.log("errr <===", err.response);
           const errorMessage = err.response.data;
           // console.log("errorMessage", errorMessage);
           alert("Error: " + errorMessage);
         });
        }
      }, []);
    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <Alert severity="success" className="col-6 offset-3">
            <h1 >Payment Refunded Successfuly</h1>
            
            </Alert>
        </div>
    );

  
};
export default Refund;
