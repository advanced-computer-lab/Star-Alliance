import { Children, useState, useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Stack from "@mui/material/Stack";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import ReservationService from "../Services/ReservationService.js";
import { UserHomeCtx } from "../Context/UserHomeContext";
import { Link } from "react-router-dom";
import styles from "../Styles/ReservationSummary.module.css";
import { useHistory } from "react-router-dom";
import back from "../images/back.png";
import top from "../images/top.png";
import summary from "../images/summary.png";
import PopupView from "../Components/PopupView";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { unstable_composeClasses } from "@mui/core";
import { faCheckCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserCtx } from "../Context/GlobalContext";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const FlightCard = ({
  title,
  flight,
  choosenSeat,
  cabin,
  adultPrice,
  totalPrice,
}) => {
  return (
    <>
      <br />
  

      <Row>
        <Col>
          <h3>{title}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Flight {flight.flightDet.flightNumber}</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            From <b>{flight.flightDet.departureAirport}</b>
          </label>
        </Col>
        <Col>
          <label>
            To <b>{flight.flightDet.arrivalAirport}</b>
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Departure DateTime:</label>
        </Col>
        <Col>
          <label>
            {moment(flight.flightDet.departureTime).format(
              "hh:mm A DD-MM-yyyy"
            )}
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Arrival DateTime:</label>
        </Col>
        <Col>
          <label>
            {moment(flight.flightDet.arrivalTime).format("hh:mm A DD-MM-yyyy")}
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Choosen Seat:</label>
        </Col>
        <Col>
          <label>{choosenSeat}</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Cabin:</label>
        </Col>
        <Col>
          <label>{cabin}</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Adult Price:</label>
        </Col>
        <Col>
          <label>
            {adultPrice} <FontAwesomeIcon icon={faDollarSign} />
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Child(ren) Price:</label>
        </Col>
        <Col>
          <label>
            {" "}
            {adultPrice / 2} <FontAwesomeIcon icon={faDollarSign} />{" "}
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Price:</label>
        </Col>
        <Col>
          <label>
            {totalPrice} <FontAwesomeIcon icon={faDollarSign} />
          </label>
        </Col>
      </Row>
    </>
  );
};

const Card = (props) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <h3>{props.title}</h3>
        </div>
        <div className={styles.cardContent}>{props.children}</div>
      </div>
    </>
  );
};

const ReservationEditSummary = () => {
  let history = useHistory();
  const [User, setUser] = useContext(UserCtx);

  console.log("User id printedddd",User.id);
  
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);

  console.log("search flightsssss check payment ", searchFlights);

  const [loadingConfirm, setloadingConfirm] = useState(false);

  const [popupOpen, setpopupOpen] = useState(false);
  const [popupChild, setpopupChild] = useState(null);
  const popupCloseCBref = useRef(null);

  if (searchFlights.data == "inital not set data") {
    setTimeout(() => {
      history.push("/");
    }, 5000);
    return (
      <div>
        <Row>
          <Link to="/">
            <img
              style={{
                marginTop: "1cm",
                marginLeft: "0.4cm",
                float: "left",
                height: "50px",
                width: "50px",
              }}
              src={back}
            />
          </Link>
        </Row>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginLeft: "0.4cm" }}>
            <FontAwesomeIcon
              style={{ color: "red" }}
              icon={faExclamationCircle}
            />
            {"       "}
            No Summary{" "}
            <img style={{ height: "50px", width: "50px" }} src={summary} />
          </h1>
          <br />
          <label>
            <i>Redirecting to Home in 5 seconds</i>
          </label>
        </div>
      </div>
    );
  } else {
    const flight1 = searchFlights.selected.flight1;
    console.log("a5ls", searchFlights);
    const flight3seat = searchFlights.selected.flight1seat.join(",");
    const flight1seat = searchFlights.selected.flight1seat;
    console.log("testing", searchFlights);
    const flight1totalPrice =
      searchFlights.selected.companions.adultCount * flight1.finalPrice +
      searchFlights.selected.companions.childCount * (0.5 * flight1.finalPrice);
    const totalPrice = flight1totalPrice ;

    const prevAmount = searchFlights.selected.flighttotalPrice;
    const refundOrPayment = prevAmount-flight1totalPrice;
    console.log("refund or payment",refundOrPayment);

    // TODO: check if there is some passed values from the previous page [reservation]
    // TODO: else query reservstion data from params
    console.log("searchFlights in Resrvation summary", searchFlights);

    const handleCheckoutClickk = () => {
     

  const data ={
           items:[
            { id: 1, quantity: 1,price: totalPrice*100 },
          ]
        }
  
    ReservationService.reservePayment(data)
    .then(res  => {
      setSearchFlights({
        ...searchFlights,
        payment_intent:res.data.payment_intent,
        toBeEdited:true,
        selected: {
          ...searchFlights.selected,
          flight1seat: [],
          flight2seat: [],
        },
      });
      console.log("ressssss",res);
        //console.log(url);
        //console.log("urllllllll is hereee",url);
        
        console.log("payment Id sentttt",searchFlights);
        window.location = res.data.url
    }).catch(e => {
        console.error(e.error);
    })
  }
  //console.log("search flightsssss to check", searchFlights);
  const handleRefundClickk = () => {
    
    setSearchFlights({
      ...searchFlights,
      toBeEdited:true,
      selected: {
        ...searchFlights.selected,
      },
    });
    
        //console.log(url);
        //console.log("urllllllll is hereee",url);
        
        history.push('/Refund');
        //window.location = res.data.url
   
  }

    const handleEditClick = () => {
      setSearchFlights({
        ...searchFlights,
        selected: {
          ...searchFlights.selected,
          flight1seat: [],
          toBeEdited:true
        },
      });
    };

    return (
      <>
        {/* <Link to="/ReservationSelection">{"<< Get Back"}</Link> */}

        <div
          style={{
            height: "150vh",
            backgroundColor: "#f5f5f5",
          }}
         

        >
          <div style={{display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"}}>
             <br/>
          <br/>
          <br/>
          <br/>
                  <h6 style={{color:"black"}}><Link to="/" style={{color:"black",textDecoration:"none"}}>Home Page </Link><FontAwesomeIcon style={{color:"black"}} icon={faArrowRight}/>
                 {" "} <Link to="/ReservationView" style={{color:"black",textDecoration:"none"}}>My Reservations </Link><FontAwesomeIcon icon={faArrowRight}/>
                 {" "} <Link to="/EditFlight" style={{color:"black",textDecoration:"none"}}>Search </Link><FontAwesomeIcon icon={faArrowRight}/>
                 {" "} <Link to="/SelectEditFlightSeat" style={{color:"black",textDecoration:"none"}}>Select Seat </Link><FontAwesomeIcon icon={faArrowRight}/>

                 {" "}  <b>Summary</b></h6>
         </div>
          <br />
          <div className="col-md-6 offset-md-3">
            <h1 style={{ padding: "1rem 0 1rem" }}>Summary</h1>
            <Card
              title={
                <>
                  <FontAwesomeIcon icon={faDollarSign} />
                  {" Price"}
                </>
              }
            >
              <Row>
                <Col>
                  <label>Total :</label>
                </Col>
                <Col>
                  <label>
                    {totalPrice} <FontAwesomeIcon icon={faDollarSign} />
                  </label>
                </Col>
              </Row>
            </Card>
            <Card
              title={
                <>
                  <FontAwesomeIcon icon={faClipboardList} />
                  {" Itinerary"}
                </>
              }
            >
              {/* dates-time, price, choosen seat */}
              {/* Flight 1 */}
              <FlightCard
                title="Flight ✈"
                flight={flight1}
                choosenSeat={flight3seat}
                cabin={searchFlights.data.seatType}
                totalPrice={flight1totalPrice}
                adultPrice={flight1.finalPrice}
              />
              <hr />
              {/* Flight2 */}
            </Card>

            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              className={styles.btmButtons}
            >
              <LinkContainer to="/SelectEditFlight">
                <Button onClick={handleEditClick} disabled={loadingConfirm}>
                  Edit <FontAwesomeIcon icon={faEdit} />
                </Button>
              </LinkContainer>
              {refundOrPayment<0?
              (<button className="btn btn-primary mx-3" onClick={handleCheckoutClickk}>
                Checkout <FontAwesomeIcon icon={faCheckCircle} />
              </button>):
              (<button className="btn btn-primary mx-3" onClick={handleRefundClickk}>
                Refund <FontAwesomeIcon icon={faCheckCircle} />
              </button>)
            }
            </Stack>
          </div>

          <Row>
            <br />
            <a href="#top">
              <img
                style={{
                  marginRight: "0.4cm",
                  float: "right",
                  height: "50px",
                  width: "50px",
                }}
                src={top}
              />
            </a>
          </Row>
        </div>
        <br />
        <br />
        <PopupView
          showDialog={popupOpen}
          setshowDialog={setpopupOpen}
          cancelCB={popupCloseCBref.current}
        >
          {popupChild}
        </PopupView>
      </>
    );
  }
};

export default ReservationEditSummary;
