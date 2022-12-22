import React, { useState } from "react";

interface IGlobalContextProps {
  signupid: any;
  setsignupid: (signupid: any) => void;
}

export const signupContext = React.createContext<IGlobalContextProps>({
  signupid: {},
  setsignupid: () => {},
});

export const SignupContextProvider = (props) => {
  const [Userid, setUserId] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  return (
    <signupContext.Provider
      value={{
        signupid: Userid,
        setsignupid: setUserId,
      }}
    >
      {props.children}
    </signupContext.Provider>
  );
};
