import { useContext } from "react";
import Cookies from "js-cookie";

import { useLogout } from "./useLogout";
import { publicAxios } from "api/axios";
import { AuthContext } from "context/Auth";

export const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);
  const logout = useLogout();

  const refresh = async () => {
    try {
      const response = await publicAxios.post(
        "/refresh",
        {},
        {
          withCredentials: true,
          headers: {
            "X-CSRF-TOKEN": Cookies.get("csrf_refresh_token"),
          },
        }
      );

      const result = response.data;
      setAuth((prev) => {
        // console.log(JSON.stringify(prev));
        // console.log(result.access_token);
        return {
          ...prev,
          access_token: result.access_token,
          access_limit: result.access_limit,
          first_name: result.first_name,
          last_name: result.last_name,
        };
      });
      return result.access_token;
    } catch (error) {
      if (error.response.status === 401) {
        logout();
      }
    }
  };
  return refresh;
};
