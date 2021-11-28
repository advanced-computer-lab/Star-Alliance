import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const SelectReturnFlights = (props) => {    
    const allData = props.location.state;
    const flight = allData.flights;
    const flights2 = allData.flights2;
    const seatType = allData.seatType;

    console.log("allData is hereeeeeeeeeeeeeeeeeee",allData);

    function GetTime(date1){
        return new Date(date1).getHours()+":"+new Date(date1).getMinutes();
    }
    function GetDate(date1){
        var date= new Date(date1);
        var z= date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
       return z; 
    }
     function getTime(date1,date2){
         var hours2= new Date(date2).getHours();
         console.log("hours2",hours2);
         var hours1= new Date(date1).getHours();
         console.log("hours",hours1);
         var minutes2= new Date(date2).getMinutes();
         console.log("minutes2",minutes2);

         var minutes1= new Date(date1).getMinutes();
         console.log("minutes1",minutes1);

         console.log("Day:",new Date(date1).getDate());
         var hours=0;
         var minutes=0
         if(minutes2>0 || minutes>0){
          minutes=(minutes2+(60-minutes1));
         }
         else{
            if(minutes2==0){
               minutes=minutes1;
            }
            else{
               minutes=minutes2;
            }
         }
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


    return(
        <div>
        <br />
        <br />
       {/*  <h1>{allData.flights[0].flightDet.flightNumber}</h1> */}

<h2 className="mx-3 mb-4">Choose Returning Flight ✈ </h2>
<h3 className="mx-3 mb-5">{flights2[0].flightDet.departureAirport} ✈ {flights2[0].flightDet.arrivalAirport}</h3>

         { flights2.map((flight) => (
                     //outset
            <div style={{border:"outset"}} className="card col-md-8 offset-md-2 mb-5">
                        <br/>

            <div  className=" card-body">
            <h4 class="card-title">Flight Number: {flight.flightDet.flightNumber}</h4>
            <hr style={{color:"black", border:"5px solid"}}/>
            <Row>
            <Col>
         <h6>Departure Date:  {GetDate(flight.flightDet.departureTime)}</h6>
         </Col>
         <Col>
             <h6>Arrival Date:  {GetDate(flight.flightDet.arrivalTime)} </h6> 
             </Col>

             </Row>
             <Row>
            <Col>
            <h6>Departure Time:  {GetTime(flight.flightDet.departureTime)}</h6>
            </Col>
         <Col>
            <h6>Arrival Time:  {GetTime(flight.flightDet.arrivalTime)}</h6>
            </Col>

             </Row>
             <Row>
            <Col>
            <h6>Class:  {seatType}</h6>
            </Col>
         <Col>
            <h6>Duration: {getTime(flight.flightDet.departureTime,flight.flightDet.arrivalTime)}</h6> 
            </Col>

             </Row>
             <Row>
            <Col>
            <h6>Baggage Allowance:  2 Bags</h6>
            </Col>
            <Col>
            <h6>Ticket Price: Adult: {flight.finalPrice}$, Child: {flight.finalPrice/2}$</h6>
            {/* <h6>Child Ticket Price: {flight.finalPrice} $</h6> */}
            </Col> 
            </Row>  
            <Col>
            
            
            <Link to={{pathname: "/SeatReservation",state: allData}}> 
            <a style={{float:"right"}} class="btn btn-primary">Select Flight ✈</a>
            </Link>
            </Col>

             
            </div>
            </div>
        ))};  

        </div> 

    );
} 
export default SelectReturnFlights;