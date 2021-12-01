import { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PopupView from "./PopupView.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faBed, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
 import { faCar } from '@fortawesome/free-solid-svg-icons'
 import { faHiking } from '@fortawesome/free-solid-svg-icons'
 import { faTaxi} from '@fortawesome/free-solid-svg-icons'
const MoreThanFlight = () => {
    return (
        <div style={{height:"13cm",backgroundColor:"#F2F4F5"}}>
        <div style={{marginTop:"2cm",marginRight:"0cm",marginLeft:"0.5cm",height:"13cm",color:"#000000"}}>
        <br />
           <h4 >LOOKING FOR MORE THAN A FLIGHT?</h4>
           <br />

        <Row>
        <Col>

<Card className="shadow-lg" style={{ width: '17rem' }}>
  <Card.Img style={{height:"6cm"}} variant="top" src="https://images.unsplash.com/photo-1587551070547-cd72963ec998?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80" />
  <Card.Body>
    <Card.Title>Find the perfect place to stay    </Card.Title>
    <Card.Text>
      with booking.com
    </Card.Text>
    <Button  href= "https://www.booking.com/" variant="primary">Go <FontAwesomeIcon icon={faBed} /> </Button>
  </Card.Body>
</Card>
        </Col>
        <Col>

<Card className="shadow-lg" style={{ width: '17rem' }}>
  <Card.Img style={{height:"6cm"}} variant="top" src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" />
  <Card.Body>
    <Card.Title>Rent a car at discounted rates</Card.Title>
    <Card.Text>
     with Hertz
    </Card.Text>
    <Button href="https://www.hertz.com/rentacar/reservation/" variant="primary">Go <FontAwesomeIcon icon={faCar} /> </Button>
  </Card.Body>
</Card>
        </Col>
        <Col>

<Card className="shadow-lg" style={{ width: '17rem' }}>
  <Card.Img  style={{height:"6cm"}} variant="top" src="https://images.unsplash.com/photo-1565639828644-ff8e088ebfa8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80" />
  <Card.Body>
    <Card.Title>Discover activities at your destination</Card.Title>
    <Card.Text>
      with Viator
    </Card.Text>
    <Button href="https://www.viator.com/?pid=P00050640&mcid=42383&medium=link&campaign=olddays" variant="primary">Go <FontAwesomeIcon icon={faHiking} /></Button>
  </Card.Body>
</Card>
        </Col>
        <Col>

<Card className="shadow-lg" style={{ width: '17rem' }}>
  <Card.Img  style={{height:"6cm"}} variant="top" src="https://images.unsplash.com/photo-1613638377394-281765460baa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dGF4aXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
  <Card.Body>
    <Card.Title>Book Your driver From any Where</Card.Title>
    <Card.Text>
      with TaxiAndGuide
    </Card.Text>
    <Button href="https://taxiandguide.com/request-taxi?gclid=Cj0KCQiA4b2MBhD2ARIsAIrcB-ShXnUCveHOQZuBDCniMjIep8spy1N9hCo8a07mQVBMrFTDkE306kEaAio3EALw_wcB&source=ChIJ1Wmehn_maC4R5qfZDi5PYNc&destination=ChIJQU-oLggXWBQRhhPiUSGvZeA" 
    variant="primary">Go <FontAwesomeIcon icon={faTaxi} /></Button>
  </Card.Body>
</Card>
        </Col>
        <Col>

<Card className="shadow-lg" style={{ width: '17rem' }}>
  <Card.Img  style={{height:"6cm"}} variant="top" src="https://images.unsplash.com/photo-1512722898403-c53d17d7d347?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" />
  <Card.Body>
    <Card.Title>Enjoy Buying from Duty Free  </Card.Title>
    <Card.Text>
      with MyDutyFree
    </Card.Text>
    <Button href="https://mydutyfree.net/" 
    variant="primary">Go <FontAwesomeIcon icon={faShoppingCart} /></Button>
  </Card.Body>
</Card>
        </Col>


</Row>
        </div>
        </div>

    );
}
export default MoreThanFlight;
