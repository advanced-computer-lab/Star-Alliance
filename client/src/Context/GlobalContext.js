import React, { useState } from "react";

/** UserCtx Type
  type {
    0 = Guest
    1 = User
    2 = Admin
  }
*/
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
