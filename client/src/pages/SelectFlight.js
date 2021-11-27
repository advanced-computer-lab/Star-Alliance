import React from "react";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import { json } from "body-parser";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const SelectFlight = () => {
    
    const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
    //let f = 
    let flights =searchFlights.data.going;
    let flights2=searchFlights.data.returning;
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
         <h2>Choose Going Flight ✈ </h2>
                 { flights.map((flight) => (
                     //outset
            <div style={{border:"outset"}} className=" card">
                        <br/>

            <div  className=" card-body">
            <h4 class="card-title">Flight Number:  {flight.flightNumber}</h4>
            <Row>
            <Col>
         <h6>Departure Date:  {GetDate(flight.departureTime)}</h6>
         </Col>
         <Col>
             <h6>Arrival Date:  {GetDate(flight.arrivalTime)} </h6> 
             </Col>

             </Row>
             <Row>
            <Col>
            <h6>Departure Time:  {GetTime(flight.departureTime)}</h6>
            </Col>
         <Col>
            <h6>Arrival Time:  {GetTime(flight.arrivalTime)}</h6>
            </Col>

             </Row>
             <Row>
            <Col>
            <h6>Class:  {seatType}</h6>
            </Col>
         <Col>
            <h6>Duration: {getTime(flight.departureTime,flight.arrivalTime)}</h6> 
            </Col>

             </Row>
             <Row>
            <Col>
            <h6>Baggage Allowance:  2 Bags</h6>
            </Col>
         <Col>
            <a href="/" class="btn btn-primary">Select Flight ✈</a>
            </Col>

             </Row>
            </div>
            </div>
        ))};  


         <h2>Choose Returning Flight ✈ </h2>

         { flights2.map((flight) => (
                     //outset
            <div style={{border:"outset"}} className=" card">
                        <br/>

            <div  className=" card-body">
            <h4 class="card-title">Flight Number:  {flight.flightNumber}</h4>
            <Row>
            <Col>
         <h6>Departure Date:  {GetDate(flight.departureTime)}</h6>
         </Col>
         <Col>
             <h6>Arrival Date:  {GetDate(flight.arrivalTime)} </h6> 
             </Col>

             </Row>
             <Row>
            <Col>
            <h6>Departure Time:  {GetTime(flight.departureTime)}</h6>
            </Col>
         <Col>
            <h6>Arrival Time:  {GetTime(flight.arrivalTime)}</h6>
            </Col>

             </Row>
             <Row>
            <Col>
            <h6>Class:  {seatType}</h6>
            </Col>
         <Col>
            <h6>Duration: {getTime(flight.departureTime,flight.arrivalTime)}</h6> 
            </Col>

             </Row>
             <Row>
            <Col>
            <h6>Baggage Allowance:  2 Bags</h6>
            </Col>
         <Col>
            <a href="/" class="btn btn-primary">Select Flight ✈</a>
            </Col>

             </Row>
            </div>
            </div>
        ))};  

        </div> 


        );

    };
    export default SelectFlight;