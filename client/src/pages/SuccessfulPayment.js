import {useContext, useEffect, useRef} from "react";
import { UserHomeCtx } from "../Context/UserHomeContext";
import UserService, { UserCtx } from "../Services/UserService.js";
import { Alert } from "@mui/material";
import LoadingSpinnerPage from "./LoadingSpinnerPage";

import ReservationService from "../Services/ReservationService.js";
const SuccessfulPayment = () => {
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  const ref = useRef(<LoadingSpinnerPage />); 
  console.log("search Flightssssss",searchFlights);
  const [user, setUser] = useContext(UserCtx);
  //const searchFlights = JSON.parse(localStorage.getItem('reservation'));
  //console.log("to confirm the reservation", searchFlights);
  useEffect(() => {

    if(searchFlights.toBeEdited === false){
    let userID = user.id;
    const flight1 = searchFlights.selected.flight1;
    const flight2 = searchFlights.selected.flight2;
    //console.log("a5ls", searchFlights);
    const flight3seat = searchFlights.selected.flight1seat.join(",");
    const flight4seat = searchFlights.selected.flight2seat.join(",");
    const flight1seat = searchFlights.selected.flight1seat;
    const flight2seat = searchFlights.selected.flight2seat;
    //console.log("testing", searchFlights);
    console.log("flight 2",flight2);
    const flight1totalPrice =
      searchFlights.selected.companions.adultCount * flight1.finalPrice +
      searchFlights.selected.companions.childCount * (0.5 * flight1.finalPrice);
    const flight2totalPrice =
      searchFlights.selected.companions.adultCount * flight2.finalPrice +
      searchFlights.selected.companions.childCount * (0.5 * flight2.finalPrice);
    const totalPrice = flight1totalPrice + flight2totalPrice;

    let data = {
        userId: userID, // TODO: new Reservation dynmaic user
        flight1num: flight1.flightDet.flightNumber,
        flight2num: flight2.flightDet.flightNumber,
        seatType: searchFlights.data.seatType,
        flight1seat: flight1seat,
        flight2seat: flight2seat,
        companions: searchFlights.selected.companions,
        companionNames:searchFlights.companionNames
      };
      ReservationService.reserveNew(data)
        .then((res) => {
          console.log("res", res);
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


        ReservationService.addPayment(data1)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          // alert("Error", err);
          console.log("errr <===", err.response);
          const errorMessage = err.response.data;
          // console.log("errorMessage", errorMessage);
          alert("Error: " + errorMessage);
        });
        })
        .catch((err) => {
          // alert("Error", err);
          console.log("errr <===", err.response);
          const errorMessage = err.response.data;
          // console.log("errorMessage", errorMessage);
          alert("Error: " + errorMessage);
        });
      }
      else {
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
 
 
         ReservationService.addPayment(data1)
         .then((res) => {
           console.log("res", res);
         })
         .catch((err) => {
           // alert("Error", err);
           console.log("errr <===", err.response);
           const errorMessage = err.response.data;
           // console.log("errorMessage", errorMessage);
           alert("Error: " + errorMessage);
         });
 
      
 
         })
         .catch((err) => {
           // alert("Error", err);
           console.log("errr <===", err.response);
           const errorMessage = err.response.data;
           // console.log("errorMessage", errorMessage);
           alert("Error: " + errorMessage);
         });
      };

      
    }, []);
        
        
      const bookingNumber = ref.current;
    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <Alert severity="success" className="col-8 offset-2">
            <h1 className="col-s-6 offset-s-3">Successful Payment</h1>
            <h2 className="col-s-6 offset-s-3">your Booking number: {bookingNumber}</h2>
            </Alert>
        </div>
    );

  
};
export default SuccessfulPayment;
