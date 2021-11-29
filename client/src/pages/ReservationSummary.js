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

import { ReservationCtx } from "../Context/ReservationContext";
import { Link } from "react-router-dom";
import styles from "../Styles/ReservationSummary.module.css";

const FlightCard = (props) => {
  return (
    <>
      <Row>
        <Col>
          <label>Flight 1</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            From <b>DATA</b>
          </label>
        </Col>
        <Col>
          <label>
            To <b>DATA</b>
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Departure DateTime:</label>
        </Col>
        <Col>
          <label>DATA</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Arrival DateTime:</label>
        </Col>
        <Col>
          <label>DATA</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Choosen Seat:</label>
        </Col>
        <Col>
          <label>DATA</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Cabin:</label>
        </Col>
        <Col>
          <label>DATA</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Price:</label>
        </Col>
        <Col>
          <label>DATA</label>
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
  const [reservation, setReservation] = useContext(ReservationCtx);
  // TODO: check if there is some passed values from the previous page [reservation]
  // TODO: else query reservstion data from params

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
                <label>EGP 51,046</label>
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
            <FlightCard />
            <hr />
            <FlightCard />
          </Card>

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            className={styles.btmButtons}
          >
            <LinkContainer to="/ReservationSelection">
              <Button>Edit</Button>
            </LinkContainer>
            <Button>Confirm</Button>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default ReservationSummary;
