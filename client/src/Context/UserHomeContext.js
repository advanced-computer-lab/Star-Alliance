import React, { useState } from "react";

export const UserHomeCtxInit = {
  data: "inital not set data",
  selected: {
    flight1: null,
    flight2: null,
    flight1seat: [],
    flight2seat: [],
    companions: {
      adultCount: 0,
      childCount: 0,
    },
  },
  ContinueLocation: "", // will hold the location to redirect to after guest sign in/up
};

export const UserHomeCtx = React.createContext();

const UserHomeContext = ({ children }) => {
  const [searchFlights, setSearchFlights] = useState(UserHomeCtxInit);

  return (
    <UserHomeCtx.Provider value={[searchFlights, setSearchFlights]}>
      {children}
    </UserHomeCtx.Provider>
  );
};

export default UserHomeContext;
