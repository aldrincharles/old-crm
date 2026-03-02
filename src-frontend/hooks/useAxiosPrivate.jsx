import { useContext, useEffect } from "react";

import { authAxios } from "api/axios";
import { AuthContext } from "context/Auth/AuthContext";
import { useRefreshToken } from "./useRefreshToken";

export const useAxiosPrivate = () => {
  const { auth } = useContext(AuthContext);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = authAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = authAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return authAxios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      authAxios.interceptors.request.eject(requestIntercept);
      authAxios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return authAxios;
};
