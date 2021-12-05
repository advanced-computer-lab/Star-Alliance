import { React, useState, useEffect, createRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import FlightService from "../Services/FlightService";
import TextField from "@mui/material/TextField";
import Alert from "../Components/Alert.js";
import { gridRowsStateSelector } from "@mui/x-data-grid-pro";

const SignUp = () => {
  const [alertOpen, setalertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const showAlert = (message) => {
    setalertMessage(message);
    setalertOpen(true);

    setTimeout(() => {
      setalertOpen(false);
    }, 3000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
      const data = {   
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        passportNumber: e.target.passportNumber.value,
        countryCode: e.target.countryCode.value,
        country: e.target.country.value,
        city: e.target.city.value,
        street: e.target.street.value,
        buildingNumber: e.target.buildingNumber.value,
        birthDate: e.target.birthDate.value,
        job: e.target.job.value,
        email: e.target.email.value,
        phoneNumbers: e.target.phoneNumbers.value,
        //password: e.target.password.value,
        //userName:e.target.userName.value
        
    };
    FlightService.createFlight(data)
    .then((res) => {
      showAlert("Signed Up Successfuly");
    }) .catch((err) => {
      console.log("errr <===", err.response);
      const errorMessage = err.response.data;
      // alert(errorMessage);
      showAlert(errorMessage);
    });
  }

  return (
    <div  class="align-items-center justify-content-center" style={{fontFamily:"cursive"}}>
   
      <br></br>
      <br></br>
      <br></br>
      <Alert
        open={alertOpen}
        setOpen={setalertOpen}
        title={alertMessage}
        desc=""
      />
      <div style={{ borderRadius: "2rem",backgroundColor:"#112D4E",marginLeft:"6cm",marginRight:"6cm"}}>
       <div style={{marginLeft:"2cm",marginRight:"2cm" ,color:"white"}}>
      <Form onSubmit={handleSubmit}
      >
        {/* <h3 classname="mb-1" >Create Flight</h3> */}
        <br/>
        <br/>
        <h2>Fill The Form</h2>
        <Row>
        
        <Col>
        
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              placeholder="Enter Your First Namer"
            />
          </Form.Group>
          </Col>
          <Col>
            <Form.Group  style={{width:"auto"}}  controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              placeholder="Enter Your Last Name"
            />
          </Form.Group>
          </Col>
        </Row>
        <Row>
        
        <Col>

          <Form.Group  style={{width:"auto"}}  controlId="birthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
            />
          </Form.Group>
          </Col>
          
         

       

       <Col>
        <Form.Group as={Col}  controlId="passportNumber">
            <Form.Label>Passport Number</Form.Label>
            <Form.Control
              name="passportNumber"
              placeholder="Enter Your passport Number "
              
            />
            </Form.Group>
        </Col>

      </Row>
             <Row >
          <Col>
          <Form.Group as={Col}  controlId="countryCode">
            <Form.Label>Country Code</Form.Label>
            <Form.Control
              name="countryCode"
              placeholder="Enter Your Country Code"
            />
          </Form.Group>
          </Col>


        

       
        <Col >
        <Form.Group as={Col} controlId="formGridFirst">
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              placeholder="Enter Country Name"
            />
          </Form.Group>
          </Col >
       </Row>
       <Row>
          <Form.Group as={Col} controlId="formGridPriceFirst">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              placeholder="Enter City Name"
            />
          </Form.Group>

        <Form.Group as={Col}  controlId="formGridBusiness">
            <Form.Label>Street</Form.Label>
            <Form.Control
              name="street"
              placeholder="Enter Street Name "
            />
          </Form.Group>
        <Form.Group
              as={Col}
              controlId="formGridPriceBusiness"
            >
              <Form.Label>Building Number</Form.Label>
              <Form.Control
                 type="Number"
                name="buildingNumber"
                placeholder="Enter Building Number"
              />
            </Form.Group>
            </Row>
            <Row >
        <Form.Group as={Col} controlId="fjob" >
         <Form.Label>Occupation</Form.Label>
            <Form.Control
              name="job"
              placeholder="Enter Your Occupation"
              />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="email"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="Email"
                  name="email"
                  placeholder="Enter Your Email Address"
                />
              </Form.Group>
            </Row>
           
            <Row>
           
         <Form.Group as={Col} controlId="phoneNumbers" >
         <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phoneNumbers"
              placeholder="Enter Phone Number"
              />
              </Form.Group>
              {/* <Form.Group
                as={Col}
                controlId="phoneNumbers"
              >
                <Form.Label>Other Phone Number </Form.Label>
                <Form.Control
                  name="phoneNumbers"
                  placeholder="Enter Phone Number"
                />
              </Form.Group> */}
            </Row> 
            <br/> 
          <div>
            <Button  className="mt-2" style={{ display: "block",marginLeft: "auto",marginRight: "0px" }} variant="primary"  type="submit">
             Sign Up
            </Button>
          </div>
          <br/>       
      </Form>
      </div>
      </div>
    </div>
  );
};
export default SignUp;


