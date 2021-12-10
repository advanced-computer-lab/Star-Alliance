import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import home from "./AdminHomePage.js";
import UpdateForm from "../Components/UpdateForm.js";
import deletePopup from "../Components/DeletePopup.js";
import FlightsList from "../Components/FlightsList.js";
import CreateFlight from "../Components/CreateFlight.js";
import TestPage from "./TestPage.js";
import UserHomePage from "./UserHomePage.js";
import AdminHomePage from "../pages/AdminHomePage.js";
import ChooseFlight from "../Components/ChooseFlight.js";
import MoreThanFlight from "../Components/MoreThanFlight.js";
import ReservationView from "../Components/ReservationView.js";
import ReservationSummary from "./ReservationSummary.js";
import FlightView from "./FlightView";
import ReservationContext from "../Context/ReservationContext.js";
import UserHomeContext from "../Context/UserHomeContext.js";
import SelectFlight from "./SelectFlight";
import SelectReturnFlights from "./SelectReturnFlights";
import ReservationSelection from "./ReservationSelection.js";
import ContextRoute from "../Context/ContextRoute.js";
import SeatReservation from "../pages/SeatReservation";
import UpdateUserData from "../pages/UpdateUserData";
import UserService from "../Services/UserService.js";
import { useEffect } from "react";
import SignUp from "../pages/SignUp.js";
import EditFlight from "../pages/EditFlight.js";
import SelectEditFlight from "../pages/SelectEditFlight.js";
import SelectEditFlightSeat from "../pages/SelectEditFlightSeat.js";
import ReservationEditSummary from "../pages/ReservationEditSummary.js";
import EditReservationContext from "../Context/EditReservationContext.js";

function ScrollToTop() {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action !== "POP") {
        window.scrollTo(0, 0);
      }
    });
    return () => unlisten();
  }, []);
  return null;
}

const Main = () => {
  const isAdmin = UserService.isAdmin();
  return (
    <>
      <ScrollToTop />
      <Switch>
        <ContextRoute
          exact
          path="/"
          Context={UserHomeContext}
          CComponent={isAdmin ? AdminHomePage : UserHomePage}
        />
       
        <ContextRoute
          exact
          path="/ReservationSelection"
          Context={ReservationContext}
          CComponent={ReservationSelection}
        />

        <ContextRoute
          exact
          path="/ReservationSummary"
          Context={UserHomeContext}
          CComponent={ReservationSummary}
        />
        <ContextRoute
          exact
          path="/SelectFlight"
          Context={UserHomeContext}
          CComponent={SelectFlight}
        />
        <ContextRoute
          exact
          path="/SeatReservation"
          Context={UserHomeContext}
          CComponent={SeatReservation}
        />
        <ContextRoute
          exact
          path="/SelectReturnFlights"
          Context={UserHomeContext}
          CComponent={SelectReturnFlights}
        />
        <ContextRoute
          exact
          path="/EditFlight"
          Context={UserHomeContext}
          CComponent={EditFlight}
        />
        <ContextRoute
          exact
          path="/SelectEditFlight"
          Context={UserHomeContext}
          CComponent={SelectEditFlight}
        />
         <ContextRoute
          exact
          path="/SelectEditFlightSeat"
          Context={UserHomeContext}
          CComponent={SelectEditFlightSeat}
        />
        <ContextRoute
          exact
          path="/ReservationEditSummary"
          Context={UserHomeContext}
          CComponent={ReservationEditSummary}
        />
        <ContextRoute
          exact
          path="/ReservationView"
          Context={UserHomeContext}
          CComponent={ReservationView}
        />
        <Route exact path="/FlightsList" component={FlightsList} />
        <Route exact path="/test" component={TestPage} />
        <Route exact path="/UpdateForm" component={UpdateForm} />
        <Route exact path="/FlightView/:flightId" component={FlightView} />
        <Route exact path="/deleteFlight" component={deletePopup}></Route>
        <Route exact path="/createFlight" component={CreateFlight}></Route>
        <Route exact path="/chooseFlight" component={ChooseFlight}></Route>
        <Route exact path="/SignUp" component={SignUp}></Route>


        <Route
          exact
          path="/ReservationView"
          component={ReservationView}
        ></Route>
        <Route exact path="/more" component={MoreThanFlight}></Route>

        <Route exact path="/UpdateUserData" component={UpdateUserData}></Route>
      </Switch>
    </>
  );
};

export default Main;
