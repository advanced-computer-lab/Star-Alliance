import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import home from "./home.js";
import UpdateForm from "../Components/UpdateForm.js";
import deletePopup from "../Components/DeletePopup.js";
import FlightsList from "../Components/FlightsList.js";
import CreateFlight from "../Components/CreateFlight.js";
import TestPage from "./TestPage.js";
import userHomePage from "../Components/userHomePage.js";
import ChooseFlight from "../Components/ChooseFlight.js";
import MoreThanFlight from "../Components/MoreThanFlight.js";
import ReservationSummary from "./ReservationSummary.js";

import ReservationContext from "../Context/ReservationContext.js";
import ReservationSelection from "./ReservationSelection.js";
import ContextRoute from "../Context/ContextRoute.js";

const Main = () => {
  return (
    <>
      <Switch>
        {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path="/" component={home} />

        <ContextRoute
          exact
          path="/ReservationSummary"
          Context={ReservationContext}
          CComponent={ReservationSummary}
        />
        <ContextRoute
          exact
          path="/ReservationSelection"
          Context={ReservationContext}
          CComponent={ReservationSelection}
        />

        <Route exact path="/test" component={TestPage} />
        <Route exact path="/UpdateForm" component={UpdateForm} />
        <Route exact path="/FlightsList" component={FlightsList} />
        <Route exact path="/FlightView/:flightId" component={FlightView} />
        <Route exact path="/deleteFlight" component={deletePopup}></Route>
        <Route exact path="/createFlight" component={CreateFlight}></Route>
        <Route exact path="/userHome" component={userHomePage}></Route>
        <Route exact path="/chooseFlight" component={ChooseFlight}></Route>
        <Route exact path="/more" component={MoreThanFlight}></Route>
      </Switch>
    </>
  );
};

export default Main;
