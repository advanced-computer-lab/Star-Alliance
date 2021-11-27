import React from "react";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import { json } from "body-parser";


const SelectFlight = () => {
    const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
    let f = searchFlights.data.going;
    let flights = f;
    let seatType = searchFlights.data.seatType;
     function getTime(date1,date2){
         var hours2= new Date(date2).getHours();
         var hours1= new Date(date1).getHours();
         var minutes2= new Date(date2).getMinutes();
         var minutes1= new Date(date1).getMinutes();
         var minutes=(minutes2+(60-minutes1));
         while(minutes>60){
            hours2=hours2+1;
            minutes=minutes-60;
         }
         var duration = Math.abs((hours2-hours1))+":"+minutes;
         return duration; 
         }

    console.log("flight here--------------",flights);
    /*const  state  = window.props;
    console.log("----------------------------------------",window.props);
*/
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
 
        <h1> Reservation Summary {JSON.stringify(searchFlights.data.going)}</h1>
        {flights.map((flight) => (
            <div class="card">
            <div class="card-body">
            <h5 class="card-title">{flight.flightNumber}</h5>
            <h6>{flight.departureTime}</h6>
            <h6>{flight.arrivalTime}</h6>
            <h6>{seatType}</h6>
            <h6>{getTime("2022-01-21T21:56:00.000Z","2022-01-21T10:13:00.000Z")}</h6> 
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
        ))};
        <Link to="/UserHome">{"<< Get Back"}</Link>

        </div> 


        );

    };
    export default SelectFlight;