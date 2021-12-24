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
   
    let data = {
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
