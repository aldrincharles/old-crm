/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "context/Auth";
import { useRefreshToken } from "hooks";
import { Outlet } from "react-router";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.access_token ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, []);

  return <>{isLoading ? null : <Outlet />}</>;
};
