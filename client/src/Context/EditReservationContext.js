import React, { useState } from "react";

const initialState = {
  data: "inital not set data",
};

export const EditReservationCtx = React.createContext();


const EditReservationContext = ({ children }) => {
  const [Editreservation, setEditReservation] = useState(initialState);

  return (
    <EditReservationCtx.Provider value={[Editreservation, setEditReservation]}>
      {children}
    </EditReservationCtx.Provider>
  );
};

export default EditReservationContext;
