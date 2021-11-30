import { React, useState, useEffect, createRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FlightService from "../Services/FlightService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPassport } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Alert from "../Components/Alert";

 
const UpdateUserData = () => {
  /* const [alertOpen, setalertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState(""); */
  let updateFormRef = createRef();

    const findUser= "61a35fcdfd33ed54997b5271";
    FlightService.GetUserInfo({findUser: "61a35fcdfd33ed54997b5271"})
      .then(({ data }) => {
        console.log("recived", data); 
        updateFormValues(data);
        //showAlert("Data Updated Successfuly");
  });
 
  /* const showAlert = (message) => {
    setalertMessage(message);
    setalertOpen(true);

    setTimeout(() => {
      setalertOpen(false);
    }, 3000);
  }; */

const handleSubmit = (e) => {
    e.preventDefault();

    // datetime example "2016-05-18T16:00:00Z"
    const data = {
      findUser: "61a35fcdfd33ed54997b5271",
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      passportNumber: e.target.passportNumber.value,
      email: e.target.email.value,
    };

    console.log("data", data);
    FlightService.updateUser(data);
}


  const updateFormValues = (data) => {
    const {
      firstName,
      lastName,
      passportNumber,
      email
    } = data; 
    console.log("firstName",updateFormRef.current); 
    if(updateFormRef.current !=null){ 
    updateFormRef.current.firstName.value = firstName;
    updateFormRef.current.lastName.value = lastName;
    updateFormRef.current.passportNumber.value = passportNumber;
    updateFormRef.current.email.value = email;
 }};

    return (
       
      <div className="mt-1 " id="testing" style={{ fontFamily: "cursive", color: "white"}}>
      <br></br>
      <br></br>
      <br></br>
    <div  className="mt-5"  style={{
          borderRadius: "2rem",
          backgroundColor: "#112D4E",
          width: "115vh",
          marginLeft: "50vh",
          marginBottom: "15vh",
          height: "45vh",
        }} >
     <div className="col-lg-10 offset-lg-1 col-md-8 offset-md-2">

      <Form ref={updateFormRef} onSubmit={handleSubmit}>
      <br/>
       <h3 className="mt-3 mb-2">My Profile <FontAwesomeIcon icon={faUser}/>  </h3>

        <Row >

        <Form.Group as={Col}  controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              placeholder="Enter Your first name"
            />
          </Form.Group>
          <Form.Group as={Col}  controlId="formGridLastName">
            <Form.Label>Last Name </Form.Label>
            <Form.Control
              name="lastName"
              placeholder="Enter your last name"
            />
          </Form.Group>
          

        </Row>
        <Row >
        <Form.Group as={Col}  controlId="formGridPassportNumber">
            <Form.Label>Passport Number <FontAwesomeIcon style={{color:"white"}} icon={faPassport}/></Form.Label>
            <Form.Control
              name="passportNumber"
              placeholder="Enter your phone number"
            />
          </Form.Group>
          <Form.Group as={Col}  controlId="formGridEmail">
            <Form.Label>Email <FontAwesomeIcon icon={faEnvelope}/> </Form.Label>
            <Form.Control
              name="email"
              placeholder="enter your email"
            />
               
                 </Form.Group>

  </Row>
        <div  style={{height:"3cm",width:"19cm",marginTop:"0.8cm"}}>
        <Button  type="submit" variant="primary">
            Update Data <FontAwesomeIcon icon={faUserEdit}/>
        </Button>
                </div>
                    
       </Form>


    </div>
      </div>
            </div>



);
}

export default UpdateUserData;