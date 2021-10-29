import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import home from "./home.js";
import deletePopup from "./deletePopup";
import create from "./createFlight.js";


const Main = () => {
  return (
    <>
     
        <Switch>
          {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path="/" component={home}></Route>
          <Route exact path="/deleteFlight" component={deletePopup}></Route>
          <Route exact path="/createFlight" component={create}></Route>

          {/* <Route path="*">
            <PageNotFound />
          </Route> */}
        </Switch>
    </>
  );
};

export default Main;
