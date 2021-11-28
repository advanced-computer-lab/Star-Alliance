import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TextField from "@mui/material/TextField";

const CreateFlight = () => {
  return (
    <div class="align-items-center justify-content-center" style={{fontFamily:"cursive"}}>
      <br></br>
      <br></br>
      <br></br>

      <Form
        action="http://localhost:8080/createFlight"
        method="post"
      >
        {/* <h3 classname="mb-1" >Create Flight</h3> */}

        <Row>
          <Form.Group as={Col} controlId="formGridflightNumber">
            <Form.Label>Flight Number</Form.Label>
            <Form.Control
              name="flightNumber"
              placeholder="Enter Flight Number"
            />
          </Form.Group>
        </Row>
        <Row>
        <Col>
            <Form.Group  style={{width:"auto"}}  controlId="formGridDepartureTime">
            <Form.Label>Departure Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="departureTime"
              placeholder="Enter Departure Time"
            />
          </Form.Group>
          </Col>
        <Col>

          <Form.Group  style={{width:"auto"}}  controlId="formGridArrivalTime">
            <Form.Label>Arrival Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="arrivalTime"
              placeholder="Enter Arrival Time"
            />
          </Form.Group>
          </Col>
          
         

        </Row>

        <Row >
        <Form.Group as={Col}  controlId="formGridEconomy">
            <Form.Label>Economy Seats Number</Form.Label>
            <Form.Control
              name="economySeatsNum"
              placeholder="Enter Economy Seat Numbers "
            />
          </Form.Group>
          <Form.Group as={Col}  controlId="formGridPriceEco">
            <Form.Label>Economy Class Price </Form.Label>
            <Form.Control
              name="economyClassPrice"
              placeholder="Please Enter the price"
            />
          </Form.Group>
          

        </Row>

       
        <Row >
        <Form.Group as={Col} controlId="formGridFirst">
            <Form.Label>First Seats Number</Form.Label>
            <Form.Control
              name="firstSeatsNum"
              placeholder="Enter First Seat Numbers "
            />
          </Form.Group>
          

          <Form.Group as={Col} controlId="formGridPriceFirst">
            <Form.Label>First Class Price</Form.Label>
            <Form.Control
              name="firstClassPrice"
              placeholder="Please Enter the price"
            />
          </Form.Group>
        </Row>
        <Row>
        <Form.Group as={Col}  controlId="formGridBusiness">
            <Form.Label>Business Seats Number</Form.Label>
            <Form.Control
              name="businessSeatsNum"
              placeholder="Enter Business Seat Numbers "
            />
          </Form.Group>
        <Form.Group
              as={Col}
              controlId="formGridPriceBusiness"
            >
              <Form.Label>Business Class Price </Form.Label>
              <Form.Control
                name="businessClassPrice"
                placeholder="Please Enter the price"
              />
            </Form.Group>
          
        
            </Row>
            <Row >


              
              
        <Form.Group as={Col} controlId="formGriddepartureAirport" >
         <Form.Label>Departure Airport </Form.Label>
            <Form.Control
              name="departureAirport"
              placeholder="Enter Departure Airport"
              />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="formGridrArivalAirport"
              >
                <Form.Label>Arrival Airport </Form.Label>
                <Form.Control
                  name="arrivalAirport"
                  placeholder="Enter Arrival Airport"
                />
              </Form.Group>
            </Row>
            <Row>
           

        <Form.Group as={Col} controlId="formGriddepartureAirport" >
         <Form.Label>Departure Terminal </Form.Label>
            <Form.Control
              name="departureTerminal"
              placeholder="Enter Departure Terminal"
              />
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="formGridrArivalAirport"
              >
                <Form.Label>Arrival Terminal </Form.Label>
                <Form.Control
                  name="arrivalTerminal"
                  placeholder="Enter Arrival Terminal"
                />
              </Form.Group>
            </Row>
          <div>
            <Button  className="mt-2" style={{ display: "block",marginLeft: "auto",marginRight: "0px" }} variant="primary" type="submit">
              Create Flight
            </Button>
          </div>
       
      </Form>
    </div>
  );
};

export default CreateFlight;
