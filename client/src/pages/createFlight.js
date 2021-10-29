import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'


const createFlight = () => {
  return (
     <div class="align-items-center justify-content-center">
<Form  style={{width:"15cm"}}>
    <Form.Group as={Col} controlId="formGridflightNumber">
      <Form.Label>Flight Number</Form.Label>
      <Form.Control placeholder="Enter Flight Number" />
    </Form.Group>
    <Row className="mb-3">  
    <Form.Group as={Col} controlId="formGridArrivalTime">
      <Form.Label>Arrival Time</Form.Label>
      <Form.Control  placeholder="Enter Arrival Time" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridDepartureTime">
      <Form.Label>Departure Time</Form.Label>
      <Form.Control  placeholder="Enter Departure Time" />
    </Form.Group>
    </Row>

    <Row className="mb-3">

  <Form.Group className="mb-3" controlId="formGridEconomy">
    <Form.Label>Number of Economy seats</Form.Label>
    <Form.Control placeholder="Enter Number of Economy seats " />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridBusiness">
    <Form.Label>Number of Business Class seats</Form.Label>
    <Form.Control placeholder="Enter Number of Business Class seats " />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridFirst">
    <Form.Label>Number of First class seats</Form.Label>
    <Form.Control placeholder="Enter Number of First Class seats " />
  </Form.Group>
  </Row>

  <Row className="mb-3">
  <Form.Group className="mb-3" controlId="formGriddepartureAirport">
    <Form.Label>Departure Airport </Form.Label>
    <Form.Control placeholder="Enter Departure Airport" />
  </Form.Group>

  
  <Form.Group className="mb-3" controlId="formGridrArivalAirport">
    <Form.Label>Arrival Airport </Form.Label>
    <Form.Control placeholder="Enter Arrival Airport" />
  </Form.Group>
  </Row>
  <Row className="mb-3">
  <Form.Group className="mb-3" controlId="formGridPriceEco">
    <Form.Label>Price for Economy Class </Form.Label>
    <Form.Control placeholder="Enter Price for Economy Class" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridPriceFirst">
    <Form.Label>Price for First Class </Form.Label>
    <Form.Control placeholder="Enter Price for First Class" />
  </Form.Group>

  
  <Form.Group className="mb-3" controlId="formGridPriceBusiness">
    <Form.Label>Price for Business Class </Form.Label>
    <Form.Control placeholder="Price for Business Class" />
  </Form.Group>
  </Row>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
  </div> 

)};

export default createFlight;