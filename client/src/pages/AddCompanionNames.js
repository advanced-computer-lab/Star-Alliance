import React, { useState } from "react";
import { useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import FlightService from "../Services/FlightService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
import { faMale } from "@fortawesome/free-solid-svg-icons";
import { faAnkh } from "@fortawesome/free-solid-svg-icons";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faPlaneArrival } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { UserHomeCtx } from "../Context/UserHomeContext";
import { EditReservationCtx } from "../Context/EditReservationContext";
import MoreThanFlight from "../Components/MoreThanFlight";
import moment from "moment";
import YouTube from "react-youtube";
import tot from "../images/tot.png";
import top from "../images/top.png";
import Alert from "../Components/Alert";


const AddCompanionNames = () => {
    const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  //const [loadingSearch, setloadingSearch] = useState(false);
  const history = useHistory();
  const formRef = useRef(null);
  const goingData = [];
  //var clicked=true; 
  const [alertMessage, setalertMessage] = useState("");
let x=[];
console.log("totalNames",searchFlights)
  for(let i=0;i<searchFlights.totalNames-1;i++){
    x.push(1);
  }
  console.log("x",x);

  const handleSubmit = () => {
    var e = formRef.current;
      let companionNames=[];
    for(let i=0;i<searchFlights.totalNames-1;i++){
      if(searchFlights.totalNames-1==1){
      console.log(e.a);

      console.log("e.a[i].value",e.a.value);
        companionNames.push(e.a.value);
      }
      else{
        companionNames.push(e.a[i].value);

      }
    }

    setSearchFlights({...searchFlights,companionNames});
    console.log("addddd",searchFlights)
      history.push("/SelectFlight");
    
  };



    return (
        <div 
      className="mt-1  "
      id="testing"
      style={{ fontFamily: "", color: "white" }}
    >
         <br/>
        <br/>
        <br/>
        <div style={{borderRadius: "2rem"}} className=" mt-5 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-4 offset-lg-4  alert alert-info" role="alert">
        <FontAwesomeIcon icon={faInfoCircle}/> Use the Last {searchFlights.children} field(s) for Child(ren) Name(s)
</div>
<div 
        className=" mt-5 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-4 offset-lg-4 " //
        style={{
          borderRadius: "2rem",
          backgroundColor: "#112D4E",
          height: "auto",
        }}>
     
   
        <div  style={{height: "auto"}} className=" col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-10 offset-lg-1">
        <br/> 
  

            <h3>Add Companion Names</h3>
            <Form ref={formRef}> 
            {x.map((info,index) => (
                <Row style={{marginTop:"0.5cm",marginLeft:"0.5cm"}}>
                <row >
                <label> Companion {index+1}:{" "}
                <input type="text" name="a" placeholder="Enter Name" />
                </label>
                </row>
                </Row>
            ))}
            <br/>
            <div style={{textAlign:"center"}}>
            <Button onClick={handleSubmit} variant="primary">
                Submit
              </Button>
              </div>
            </Form>  
            <br/>  
            </div>
            </div>
        </div>
    )
}
export default AddCompanionNames;
