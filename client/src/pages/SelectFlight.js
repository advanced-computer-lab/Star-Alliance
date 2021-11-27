import React from "react";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import { json } from "body-parser";


const SelectFlight = () => {
    
    const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
    //let f = 
    let flights =searchFlights.data.going;
    let seatType = searchFlights.data.seatType;
    console.log("testing",searchFlights.data.going);
    function GetTime(date1){
        return new Date(date1).getHours()+":"+new Date(date1).getMinutes();
    }
    function GetDate(date1){
        var date= new Date(date1);
        var z= date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
       return z; 
    }
     function getTime(date1,date2){
         var hours2= new Date(date2).getHours();
         var hours1= new Date(date1).getHours();
         var minutes2= new Date(date2).getMinutes();
         var minutes1= new Date(date1).getMinutes();
         console.log("Day:",new Date(date1).getDate());
         var hours=0;
         var minutes=(minutes2+(60-minutes1));
         if(hours2>hours1){
            hours=hours2-hours1;
         }
         else{
             hours=(24-hours1)+hours2;
         }
         while(minutes>60){
            hours=hours+1;
            minutes=minutes-60;
            
         }
         if(minutes==60){
            hours=hours+1;
            minutes=minutes-60;

        }
         var duration = hours+" hours "+minutes+" minutes";
         return duration; 
         }

   // console.log("flight here--------------",flights);
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
 
         {/* <h1> Reservation Summary {JSON.stringify(searchFlights.data.going)}</h1>  */}
                 { flights.map((flight) => (
            <div class="card">
            <div class="card-body">
            <h5 class="card-title">Flight Number:  {flight.flightNumber}</h5>
         <h6>Departure Date:  {GetDate(flight.departureTime)}</h6>
             <h6>Arrival Date:  {GetDate(flight.arrivalTime)} </h6> 
            <h6>Departure Time:  {GetTime(flight.departureTime)}</h6>
            <h6>Arrival Time:  {GetTime(flight.arrivalTime)}</h6>
            <h6>Class:  {seatType}</h6>
            <h6>Duration: {getTime(flight.departureTime,flight.arrivalTime)}</h6> 
            <h6>Baggage Allowance:  2 Bags</h6>
            <a href="#" class="btn btn-primary">Select Flight ✈</a>
            </div>
            </div>
        ))};  
        <Link to="/UserHome">{"<< Get Back"}</Link>

        </div> 


        );

    };
    export default SelectFlight;