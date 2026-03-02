import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { NavLink } from "components";
import { JobsSourceExportMain } from "./Source_Export/JobsSourceExportMain";
import { JSMasterlistController } from "./Source_Masterlist/JSMasterlistController";
import { JobSourceMapOutMain } from "./Source_Mapout/JobSourceMapOutMain";
import { JobSourceVerificationMain } from "./Source_Verification/JobSourceVerificationMain";

const JobSourceMain = () => {
  const navLinks = [
    {
      to: `export`,
      path: `export`,
      label: "Export",
      Component: JobsSourceExportMain,
    },
    {
      to: `master-list`,
      path: `master-list`,
      label: "Masterlist",
      Component: JSMasterlistController,
    },
    {
      to: `linkedin`,
      path: `linkedin`,
      label: " LinkedIn",
      Component: JobSourceMapOutMain,
    },
    {
      to: `verification`,
      path: `verification`,
      label: "Verification",
      Component: JobSourceVerificationMain,
    },
  ];

  return (
    <>
      <div className="mb-3">
        <ul className="nav justify-content-center nav-tabs">
          {navLinks.map(({ label, to }) => (
            <li className="nav-item " key={to}>
              <NavLink className="nav-link" activeClassName="active" to={to}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Routes>
        <Route index element={<Navigate replace to="export" />} />
        {navLinks.map(({ Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </>
  );
};
export { JobSourceMain };
