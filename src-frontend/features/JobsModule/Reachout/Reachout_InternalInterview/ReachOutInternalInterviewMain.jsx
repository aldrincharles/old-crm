import React, { useMemo } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { NavLink } from "components";
import { InternalInterviewScreenMain } from "./InternalInterviewScreen/InternalInterviewScreenMain";
import { InternalInterviewInDepthMain } from "./InternalInterviewInDepth/InternalInterviewInDepthMain";
const ReachoutInternalInterviewMain = ({ name }) => {
  const navLinks = useMemo(
    () => [
      {
        to: `screen`,
        path: `screen`,
        label: "Internal IV Screen",
        Component: InternalInterviewScreenMain,
      },
      {
        to: `in-depth`,
        path: `in-depth`,
        label: "Internal IV In-Depth",
        Component: InternalInterviewInDepthMain,
      },
    ],
    []
  );

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
        <Route index element={<Navigate replace to="screen" />} />
        {navLinks.map(({ exact, path, Component }) => (
          <Route exact={exact} path={path} element={<Component />} />
        ))}
      </Routes>
    </>
  );
};
export { ReachoutInternalInterviewMain };
