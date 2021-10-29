import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import home from "./home.js";

const Main = () => {
  return (
    <>
     
        <Switch>
          {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path="/" component={home}></Route>
          
          {/* <Route path="*">
            <PageNotFound />
          </Route> */}
        </Switch>
    </>
  );
};

export default Main;
