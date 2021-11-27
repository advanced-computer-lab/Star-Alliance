import React, { useState } from "react";

const initialState = {
  data: "inital not set data",
};

export const UserHomeCtx = React.createContext();


const UserHomeContext = ({ children }) => {
  const [searchFlights, setSearchFlights] = useState(initialState);

  return (
    <UserHomeCtx.Provider value={[searchFlights, setSearchFlights]}>
      {children}
    </UserHomeCtx.Provider>
  );
};

export default UserHomeContext;
