import React, { createContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const useAuthContext = () => {
  const [auth, setAuth] = useState(null);

  const authContext = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth, setAuth]
  );

  return authContext;
};

const AuthProvider = ({ children }) => {
  const authContext = useAuthContext();
  return <Provider value={authContext}>{children}</Provider>;
};

export { AuthContext, AuthProvider };
