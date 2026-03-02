import React, { useContext } from "react";

import { useLocation, Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "context/Auth";

export const PrivateRoute = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return allowedRoles?.includes(auth?.access_limit) ? (
    <Outlet />
  ) : auth?.access_token ? ( //changed from user to accessToken to persist login after refresh
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
