import { useContext } from "react";
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

const ReservationSummary = () => {
  const [reservation, setReservation] = useContext(ReservationCtx);

  return (
    <>
      <br />
      <br />
      <br />
      <h1> Reservation Summary {JSON.stringify(reservation)}</h1>
      <Link to="/ReservationSelection">{"<< Get Back"}</Link>
      <br />
      <br />
    </>
  );
};

export default ReservationSummary;
