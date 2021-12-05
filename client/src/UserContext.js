import React, { createContext, useState } from "react";

export const UserContext = createContext();
export const UserProvider = (props) => {
  const [typeOfUser, setTypeOfUser] = useState("guestUser");
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ typeOfUser, setTypeOfUser, user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
