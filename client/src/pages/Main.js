import React, { useContext, useEffect } from "react";
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
import ContextRoute from "../Context/ContextRoute.js";
import SeatReservation from "../pages/SeatReservation";
import UpdateUserData from "../pages/UpdateUserData";
import UserService from "../Services/UserService.js";
import SignUp from "../pages/SignUp.js";
import EditFlight from "../pages/EditFlight.js";
import SelectEditFlight from "../pages/SelectEditFlight.js";
import SelectEditFlightSeat from "../pages/SelectEditFlightSeat.js";
import ReservationEditSummary from "../pages/ReservationEditSummary.js";
import EditReservationContext from "../Context/EditReservationContext.js";
import ChangePassword from "../Components/ChangePassword.js";
import SignIn from "../pages/SignIn.js";
import { UserCtx } from "../Context/GlobalContext.js";

import Cookies from "js-cookies";

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

const WrapContext = ({ children, Component, Context }) => {
  return (
    <Context>
      <Component />
    </Context>
  );
};

const Main = () => {
  const isAdmin = UserService.isAdmin();
  const isUser = UserService.isUser();
  const [User, setUser] = useContext(UserCtx);

  useEffect(() => {
    // When a Refresh happens
    console.log("REFRESH");
    const strUserData = localStorage.getItem("user");
    try {
      const user = JSON.parse(strUserData);
      setUser(user);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    console.log("REFRESH User Changed");
    console.log(User);
    localStorage.setItem("user", JSON.stringify(User));
  }, [User]);

  const ConditionedRoute = ({ Component, condition, ...rest }) => {
    console.log("condition", condition);
    console.log(rest);
    return <Route {...rest} component={condition ? Component : null} />;
  };
  const AdminRoute = ({ Component, ...rest }) => {
    return (
      <ConditionedRoute {...rest} Component={Component} condition={isAdmin} />
    );
  };

  const UserRoute = ({ Component, ...rest }) => {
    // console.log("UserRoute");
    // console.log(rest);
    return (
      <ConditionedRoute {...rest} Component={Component} condition={isUser} />
    );
  };

  // if (!valid) return null;

  return (
    <>
      <ScrollToTop />
      <Switch>
        {/* 
      Everyone can access the page:
          without context: <Route path="/" exact component={Home} />
          with context: <ContextRoute exact path="/SelectFlight" Context={UserHomeContext} CComponent={SelectFlight} />
      Only Admin:
          without context: <AdminRoute exact path="/SelectFlight" Component={SelectFlight}/> 
          with context <AdminRoute exact path="/SelectFlight" Component={() => ( <WrapContext Context={UserHomeContext} Component={SelectFlight} />)} /> 
      Only User:
          without context: <UserRoute exact path="/SelectFlight" Component={SelectFlight}/> 
          with context <UserRoute exact path="/SelectFlight" Component={() => ( <WrapContext Context={UserHomeContext} Component={SelectFlight} />)} /> 
*/}
        <ContextRoute
          exact
          path="/"
          Context={UserHomeContext}
          CComponent={isAdmin ? AdminHomePage : UserHomePage}
        />
        <UserRoute
          exact
          path="/ReservationSummary"
          Component={() => (
            <WrapContext
              Context={UserHomeContext}
              Component={ReservationSummary}
            />
          )}
        />
        <UserRoute
          exact
          path="/SelectFlight"
          Component={() => (
            <WrapContext Context={UserHomeContext} Component={SelectFlight} />
          )}
        />
        <UserRoute
          exact
          path="/SeatReservation"
          Component={() => (
            <WrapContext
              Context={UserHomeContext}
              Component={SeatReservation}
            />
          )}
        />
        <UserRoute
          exact
          path="/SelectReturnFlights"
          Component={() => (
            <WrapContext
              Context={UserHomeContext}
              Component={SelectReturnFlights}
            />
          )}
        />

        <UserRoute
          exact
          path="/EditFlight"
          Component={() => (
            <WrapContext Context={UserHomeContext} Component={EditFlight} />
          )}
        />

        <UserRoute
          exact
          path="/SelectEditFlight"
          Component={() => (
            <WrapContext
              Context={UserHomeContext}
              Component={SelectEditFlight}
            />
          )}
        />
        <UserRoute
          exact
          path="/SelectEditFlightSeat"
          Component={() => (
            <WrapContext
              Context={UserHomeContext}
              Component={SelectEditFlightSeat}
            />
          )}
        />
        <UserRoute
          exact
          path="/ReservationEditSummary"
          Component={() => (
            <WrapContext
              Context={UserHomeContext}
              Component={ReservationEditSummary}
            />
          )}
        />
        <UserRoute
          exact
          path="/ReservationView"
          Component={() => (
            <WrapContext
              Context={UserHomeContext}
              Component={ReservationView}
            />
          )}
        />

        <AdminRoute exact path="/FlightsList" Component={FlightsList} />
        <AdminRoute exact path="/UpdateForm" Component={UpdateForm} />
        <AdminRoute exact path="/FlightView/:flightId" component={FlightView} />
        <AdminRoute exact path="/deleteFlight" Component={deletePopup} />
        <AdminRoute exact path="/createFlight" Component={CreateFlight} />

        {/* ??? what is this */}
        <Route exact path="/chooseFlight" component={ChooseFlight} />

        {/* updateuserdata Should be renammed to my profile */}
        <Route exact path="/UpdateUserData" component={UpdateUserData} />
        <Route exact path="/more" component={MoreThanFlight} />
        <Route exact path="/ChangePassword" component={ChangePassword} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />

        <Route exact path="/test" component={TestPage} />
      </Switch>
    </>
  );
};

export default Main;
