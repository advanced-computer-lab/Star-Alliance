import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const UpdateUserData = () => {
    return (
    <div class="align-items-center justify-content-center" style={{fontFamily:"cursive"}}>
      <br></br>
      <br></br>
      <br></br>

      <Row >
        <Form.Group as={Col}  controlId="formGridFirstName">
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              name="FirstName"
              placeholder="Enter Your first name"
            />
          </Form.Group>
          <Form.Group as={Col}  controlId="formGridLastName">
            <Form.Label>LastName </Form.Label>
            <Form.Control
              name="Last name"
              placeholder="Enter your last name"
            />
          </Form.Group>
          

        </Row>



        <Row >
        <Form.Group as={Col}  controlId="formGridPassportNumber">
            <Form.Label>Passport Number</Form.Label>
            <Form.Control
              name="Passport Number"
              placeholder="Enter your phone number"
            />
          </Form.Group>
          <Form.Group as={Col}  controlId="formGridEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control
              name="email"
              placeholder="enter your email"
            />
          </Form.Group>
          

        </Row>
        <div  style={{height:"3cm",width:"19cm",marginTop:"0.8cm"}}>
        <Button   variant="primary" type="confirm">
            Confirm Data
        </Button>
        </div>


    </div>

);

}

export default UpdateUserData;