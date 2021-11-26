import { useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import ImgCard from "../Components/ImgCard";
import DeletePopup from "../Components/DeletePopup";
import UpdateForm from "../Components/UpdateForm";
import CreateFlight from "../Components/CreateFlight.js";
import FlightsList from "../Components/FlightsList";
import { Link } from "react-router-dom";
import { ReservationCtx } from "../Context/ReservationContext";

const ReservationSelection = () => {
  const [reservation, setReservation] = useContext(ReservationCtx);
  //
  const ref = useRef(null);
  return (
    <>
      <br />
      <br />
      <br />
      <h1>Reservation Selection</h1>
      <h3>
        This data will be forwarded to Reservation Summary Page for example
      </h3>
      <h4>
        *will be deleted on page refresh. you must use Link from
        react-router-dom
      </h4>
      <span>
        <label>data: </label>
        <input ref={ref} />
      </span>
      <button
        onClick={() => {
          reservation.data = ref.current.value;
        }}
      >
        Update
      </button>
      <br />
      <br />
      <Link to="/ReservationSummary">{">> Continue"}</Link>
    </>
  );
};

export default ReservationSelection;
