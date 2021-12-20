import React, { useContext, useEffect, useState, useRef } from "react";
import { parse, stringify } from "flatted/cjs";
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
import SelectNewSeat from "../pages/SelectNewSeat.js";
import NotFoundPage from "../pages/NotFoundPage.js";
import EditReservationContext from "../Context/EditReservationContext.js";
import ChangePassword from "../Components/ChangePassword.js";
import SignIn from "../pages/SignIn.js";
import { UserCtx } from "../Context/GlobalContext.js";
import { UserHomeCtx } from "../Context/UserHomeContext";
import CompanionsList from "./CompanionsList.js";
import LoadingSpinnerPage from "./LoadingSpinnerPage.js";
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

const Main = () => {
  const isAdmin = UserService.isAdmin();
  const isUser = UserService.isUser();
  const [User, setUser] = useContext(UserCtx);
  const [searchFlights, setSearchFlights] = useContext(UserHomeCtx);

  const render = useRef(false);
  const [, forceRerender] = useState();
  useEffect(() => {
    // When a Refresh happens
    console.log("REFRESH");
    const strUserData = localStorage.getItem("user");
    const strSearchFlights = localStorage.getItem("searchflights");

    try {
      const user = JSON.parse(strUserData);
      if (user) setUser(user);

      // const searchFlights = JSON.parse(strSearchFlights);
      const searchFlights = parse(strSearchFlights);

      if (searchFlights) setSearchFlights(searchFlights);

      render.current = true;
      forceRerender({});
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    console.log("REFRESH User Changed");
    console.log(User);
    localStorage.setItem("user", JSON.stringify(User));
  }, [User]);

  useEffect(() => {
    console.log("REFRESH searchFlights Changed");
    const stringified = stringify(searchFlights);
    console.log(stringified);
    // localStorage.setItem("searchflights", JSON.stringify(searchFlights));
    localStorage.setItem("searchflights", stringified);
  }, [searchFlights]);

  const AdminRoute = ({ CComponent, ...rest }) => {
    // return (
    //   <ConditionedRoute {...rest} Component={Component} condition={isAdmin} />
    // );
    const NewComp = () => {
      let history = useHistory();
      const ref = useRef(<LoadingSpinnerPage />);
      const [, forceRender] = useState({});
      useEffect(() => {
        if (isAdmin) {
          ref.current = <CComponent />;
        } else {
          ref.current = <NotFoundPage />;
        }
        forceRender({});
      }, []);
      return ref.current;
    };
    return <Route {...rest} component={NewComp} />;
  };

  const UserRoute = ({ CComponent, ...rest }) => {
    const NewComp = () => {
      let history = useHistory();
      const ref = useRef(<LoadingSpinnerPage />);
      const [, forceRender] = useState({});
      useEffect(() => {
        if (!isUser) {
          // save the the current location, for guest to redirect back to it
          alert("You have to Sign In or Create an Account, to Continue");
          const ContinueLocation = history.location.pathname;
          setSearchFlights({ ...searchFlights, ContinueLocation });
          history.push("/signin");
        } else {
          ref.current = <CComponent />;
          forceRender({});
        }
      }, []);
      return ref.current;
    };
    return <Route {...rest} component={NewComp} />;
  };

  const ConditionedRoute = ({ CComponent, condition, message, ...rest }) => {
    const NewComp = () => {
      let history = useHistory();
      const ref = useRef(<LoadingSpinnerPage />);
      const [, forceRender] = useState({});
      useEffect(() => {
        if (condition) {
          ref.current = <CComponent />;
          forceRender({});
        } else {
          const display = message
            ? message
            : "Somthing is not Right, Please try again";
          alert(display);
          history.push("/");
        }
      }, []);
      return ref.current;
    };
    return <Route {...rest} component={NewComp} />;
  };

  // This to Ensure that whatever states stored in localstoreage is applied before the page is rendered
  if (!render.current) return <LoadingSpinnerPage />;

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
        <Route
          exact
          path="/"
          component={isAdmin ? AdminHomePage : UserHomePage}
        />

        <Route exact path="/SelectFlight" component={SelectFlight} />
        <Route
          exact
          path="/SelectReturnFlights"
          component={SelectReturnFlights}
        />
        <Route exact path="/SeatReservation" component={SeatReservation} />
        <Route
          exact
          path="/ReservationSummary"
          component={ReservationSummary}
        />

        <UserRoute exact path="/EditFlight" CComponent={EditFlight} />
        <UserRoute
          exact
          path="/SelectEditFlight"
          CComponent={SelectEditFlight}
        />
        <UserRoute
          exact
          path="/SelectEditFlightSeat"
          CComponent={SelectEditFlightSeat}
        />
        <UserRoute
          exact
          path="/ReservationEditSummary"
          CComponent={ReservationEditSummary}
        />
        <UserRoute exact path="/ReservationView" CComponent={ReservationView} />
        <UserRoute exact path="/SelectNewSeat" CComponent={SelectNewSeat} />
        <AdminRoute exact path="/FlightsList" CComponent={FlightsList} />
        <AdminRoute exact path="/UpdateForm" CComponent={UpdateForm} />
        <AdminRoute
          exact
          path="/FlightView/:flightId"
          CComponent={FlightView}
        />
        <AdminRoute exact path="/deleteFlight" CComponent={deletePopup} />
        <AdminRoute exact path="/createFlight" CComponent={CreateFlight} />

        {/* ??? what is this */}
        <Route exact path="/chooseFlight" component={ChooseFlight} />

        {/* updateuserdata Should be renammed to my profile */}
        <UserRoute exact path="/UpdateUserData" CComponent={UpdateUserData} />
        <UserRoute exact path="/CompanionsList" CComponent={CompanionsList} />

        <ConditionedRoute
          exact
          path="/ChangePassword"
          CComponent={ChangePassword}
          condition={UserService.isLoggedIn()}
          message={"You have to Sign In or Create an Account, to Continue"}
        />
        <Route exact path="/more" component={MoreThanFlight} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/test" component={TestPage} />
        <Route path="/*" component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default Main;
