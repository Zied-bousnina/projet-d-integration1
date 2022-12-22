import React, { useState } from "react";

interface IGlobalContextProps {
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
  loggedinuser: any;
  setLoggedinuser: (loggedinuser: any) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  user: {},
  loading: true,
  setUser: () => {},
  setLoading: () => {},
  loggedinuser: () => {},
  setLoggedinuser: () => {},
});

export const GlobalContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [mainUser, setMainUser] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        user: currentUser,
        loading: isLoading,
        setUser: setCurrentUser,
        setLoading: setIsLoading,
        loggedinuser: mainUser,
        setLoggedinuser: setMainUser,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
