import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { NavLink } from "components";
import { ReachoutSendOutMain } from "./Reachout_Sendout/ReachoutSendoutMain";
import { ReachoutResponsesMain } from "./Reachout_Responses/ReachoutResponsesMain";
import { ReachoutInternalInterviewMain } from "./Reachout_InternalInterview/ReachOutInternalInterviewMain";
import { ReachoutSubmittedClientMain } from "./Reachout_SubmittedClient/ReachoutSubmittedClientMain";
import { ReachoutClientInterviewMain } from "./Reachout_ClientInterview/ReachoutClientInterviewMain";
import { ReachoutPlacementMain } from "./Reachout_Placement/ReachoutPlacementMain";

const JobsReachOutMain = () => {
  const routes = [
    {
      to: `sendout`,
      path: `sendout`,
      label: "Send Out",
      Component: ReachoutSendOutMain,
    },
    {
      to: `responses`,
      path: `responses`,
      label: "Responses",
      Component: ReachoutResponsesMain,
    },
    {
      to: `internal-interview`,
      path: `internal-interview/*`,
      label: "Internal Interview",
      Component: ReachoutInternalInterviewMain,
    },
    {
      to: `submitted-to-client`,
      path: `submitted-to-client`,
      label: "Submitted to Client",
      Component: ReachoutSubmittedClientMain,
    },
    {
      to: `client-interview`,
      path: `client-interview`,
      label: "Client Interview",
      Component: ReachoutClientInterviewMain,
    },
    {
      to: `placement`,
      path: `placement`,
      label: "Placement",
      Component: ReachoutPlacementMain,
    },
  ];

  return (
    <>
      <div className="mb-3">
        <ul className="nav justify-content-center nav-tabs">
          {routes.map(({ label, to }) => (
            <li className="nav-item " key={to}>
              <NavLink className="nav-link" activeClassName="active" to={to}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Routes>
        <Route index element={<Navigate replace to="sendout" />} />
        {routes.map(({ exact, path, Component }) => (
          <Route exact={exact} path={path} element={<Component />} />
        ))}
      </Routes>
    </>
  );
};
export { JobsReachOutMain };
