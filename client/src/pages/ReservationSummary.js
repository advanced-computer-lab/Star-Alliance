import { Children, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

import moment from "moment";

const FlightCard = ({ flight, choosenSeat, cabin, price }) => {
  return (
    <>
    <br/>
      <Row>
        <Col><h2 className="mx-5 mb-5 mt-3">View Your Reservation Summary ✈  </h2></Col>
        <Col ><Link to="/SeatReservation">
        <button style={{float:"right", marginRight:"13rem"}} class="btn btn-primary mb-5 mt-3">Back To The Previous Page</button>
        </Link></Col>
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
          <label>Price:</label>
        </Col>
        <Col>
          <label>EGP {price}</label>
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

// n

const ReservationSummary = () => {
  let history = useHistory();
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
  const flight1 = searchFlights.selected.flight1;
  const flight2 = searchFlights.selected.flight2;
  const flight1seat = searchFlights.selected.flight1seat;
  const flight2seat = searchFlights.selected.flight2seat;

  // TODO: check if there is some passed values from the previous page [reservation]
  // TODO: else query reservstion data from params
  console.log("searchFlights in Resrvation summary", searchFlights);
  const handleSubmitReservation = () => {
    let data = {
      userId: "61a35fcdfd33ed54997b5271", // TODO: new Reservation dynmaic user
      flight1num: flight1.flightDet.flightNumber,
      flight2num: flight2.flightDet.flightNumber,
      seatType: searchFlights.data.seatType,
      flight1seat: flight1seat,
      flight2seat: flight2seat,
      companions: searchFlights.selected.companions,
    };
    ReservationService.reserveNew(data)
      .then((res) => {
        console.log("res", res);
        const bookingNumber = res.data.bookingNumber;
        console.log("OK ===> ", res);
        history.push("/"); // navigate home
        alert(
          `Your Flights has been Reserved, Booking Number ${bookingNumber}`,
          res
        );
        // clear every selection the user made
        setSearchFlights({ ...searchFlights, selected: {} });
      })
      .catch((err) => {
        // alert("Error", err);
        console.log("errr <===", err.response);
        const errorMessage = err.response.data;
        // console.log("errorMessage", errorMessage);
        alert("Error: " + errorMessage);
      });
  };
  return (
    <>
      {/* <Link to="/ReservationSelection">{"<< Get Back"}</Link> */}

      <div
        style={{
          height: "130vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div className={styles.container}>
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
                <label>Total:</label>
              </Col>
              <Col>
                <label>EGP {flight1.finalPrice + flight2.finalPrice}</label>
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
              flight={flight1}
              choosenSeat={flight1seat}
              cabin={searchFlights.data.seatType}
              price={flight1.finalPrice}
            />
            <hr />
            {/* Flight2 */}
            <FlightCard
              flight={flight2}
              choosenSeat={flight2seat}
              cabin={searchFlights.data.seatType}
              price={flight2.finalPrice}
            />
          </Card>

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            className={styles.btmButtons}
          >
            <LinkContainer to="/SelectFlight">
              <Button>Edit</Button>
            </LinkContainer>
            <Button onClick={handleSubmitReservation}>Confirm</Button>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default ReservationSummary;
