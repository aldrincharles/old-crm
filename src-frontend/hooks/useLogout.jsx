import { useContext } from "react";

import { publicAxios } from "api/axios";
import { AuthContext } from "context/Auth";

export const useLogout = () => {
  const { setAuth } = useContext(AuthContext);

  const logout = async () => {
    setAuth({});
    try {
      await publicAxios.post("/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};
