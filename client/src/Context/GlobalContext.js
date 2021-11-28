import React, { useState } from "react";

const UserCtxInit = {
  type: 0,
};

const UserCtx = React.createContext();
export { UserCtx };

const GlobalContext = ({ children }) => {
  const [user, setUser] = useState(UserCtxInit);

  return (
    <UserCtx.Provider value={[user, setUser]}>{children}</UserCtx.Provider>
  );
};

export default GlobalContext;
