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

const ReservationSummary = () => {
  let history = useHistory();
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);
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
    const flight2 = searchFlights.selected.flight2;
    console.log("a5ls", searchFlights);
    const flight3seat = searchFlights.selected.flight1seat.join(",");
    const flight4seat = searchFlights.selected.flight2seat.join(",");
    const flight1seat = searchFlights.selected.flight1seat;
    const flight2seat = searchFlights.selected.flight2seat;
    console.log("testing", searchFlights);
    const flight1totalPrice =
      searchFlights.selected.companions.adultCount * flight1.finalPrice +
      searchFlights.selected.companions.childCount * (0.5 * flight1.finalPrice);
    const flight2totalPrice =
      searchFlights.selected.companions.adultCount * flight2.finalPrice +
      searchFlights.selected.companions.childCount * (0.5 * flight2.finalPrice);
    const totalPrice = flight1totalPrice + flight2totalPrice;

    // TODO: check if there is some passed values from the previous page [reservation]
    // TODO: else query reservstion data from params
    console.log("searchFlights in Resrvation summary", searchFlights);
    const handleSubmitReservation = () => {
      setloadingConfirm(true);
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

          setloadingConfirm(false);
          popupCloseCBref.current = () => {
            history.push("/"); // navigate home
            // clear every selection the user made
            setSearchFlights({ ...searchFlights, selected: {} });
          };
          setpopupChild(
            <>
              <h2>Your Flights has been Reserved</h2>
              <h2> Booking Number:</h2>
              <h2>{bookingNumber}</h2>
            </>
          );
          setpopupOpen(true);

          // alert(
          //   `Your Flights has been Reserved, Booking Number ${bookingNumber}`,
          //   res
          // );
        })
        .catch((err) => {
          // alert("Error", err);
          console.log("errr <===", err.response);
          const errorMessage = err.response.data;
          // console.log("errorMessage", errorMessage);
          alert("Error: " + errorMessage);
        });
    };

    const handleEditClick = () => {
      setSearchFlights({
        ...searchFlights,
        selected: {
          ...searchFlights.selected,
          flight1seat: [],
          flight2seat: [],
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
          <Row>
            <Link to="/SeatReservation">
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
                  <label>Total (Round trip):</label>
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
                title="Going Flight ✈"
                flight={flight1}
                choosenSeat={flight3seat}
                cabin={searchFlights.data.seatType}
                totalPrice={flight1totalPrice}
                adultPrice={flight1.finalPrice}
              />
              <hr />
              {/* Flight2 */}
              <FlightCard
                title="Returning Flight ✈"
                flight={flight2}
                choosenSeat={flight4seat}
                cabin={searchFlights.data.seatType}
                totalPrice={flight2totalPrice}
                adultPrice={flight2.finalPrice}
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
                <Button onClick={handleEditClick} disabled={loadingConfirm}>
                  Edit <FontAwesomeIcon icon={faEdit} />
                </Button>
              </LinkContainer>
              <Button
                onClick={handleSubmitReservation}
                disabled={loadingConfirm}
              >
                Confirm {"  "}
                {loadingConfirm ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <FontAwesomeIcon icon={faCheckCircle} />
                )}
              </Button>
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

export default ReservationSummary;
