import React, { useState, useMemo } from "react";

/** UserCtx Type
  type {
    0 = Guest
    1 = User
    2 = Admin
  }
*/
const UserCtxInit = {
  id: null,
  type: 0,
};

const UserCtx = React.createContext();
export { UserCtx };

const GlobalContext = ({ children }) => {
  const [user, setUser] = useState(UserCtxInit);
  const value = useMemo(() => [user, setUser], [user, setUser]);

  return <UserCtx.Provider value={value}>{children}</UserCtx.Provider>;
};

export default GlobalContext;
