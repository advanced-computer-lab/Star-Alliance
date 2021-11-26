import React, { useState } from "react";

const initialState = {
  data: "inital not set data",
};

export const ReservationCtx = React.createContext();

const ReservationContext = ({ children }) => {
  const [reservation, setReservation] = useState(initialState);

  return (
    <ReservationCtx.Provider value={[reservation, setReservation]}>
      {children}
    </ReservationCtx.Provider>
  );
};

export default ReservationContext;
