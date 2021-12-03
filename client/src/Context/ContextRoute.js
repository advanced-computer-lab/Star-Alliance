import React from "react";
import { Route } from "react-router-dom";

const ContextRoute = ({ Context, CComponent, ...rest }) => {
  //   <Route exact path="/ReservationSummary">
  //   <ReservationContext>
  // 	<ReservationSummary />
  //   </ReservationContext>
  // </Route>
  const res = (
    <Route {...rest}>
      <Context>
        <CComponent />
      </Context>
    </Route>
  );
  return res;
};

export default ContextRoute;
