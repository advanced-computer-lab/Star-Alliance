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

const Main = () => {
  return (
    <>
      <Switch>
        {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path="/" component={home} />
        <Route exact path="/test" component={TestPage} />
        <Route exact path="/UpdateForm" component={UpdateForm} />
        <Route exact path="/FlightsList" component={FlightsList} />
        <Route exact path="/deleteFlight" component={deletePopup}></Route>
        <Route exact path="/createFlight" component={CreateFlight}></Route>
        <Route exact path="/userHome" component={userHomePage}></Route>
        <Route exact path="/chooseFlight" component={ChooseFlight}></Route>

      </Switch>
    </>
  );
};

export default Main;
