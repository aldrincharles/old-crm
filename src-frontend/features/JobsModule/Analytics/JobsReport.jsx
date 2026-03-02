import React, { useRef } from "react";

import {
  useParams,
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import { NavLink } from "components";
import { SearchAnalytics } from "./SearchAnalytics/SearchAnalytics";
import { SearchReportTab } from "./SearchReport/SearchReportTab";
import { useReactToPrint } from "react-to-print";
import { Button } from "reactstrap";

function JobsReport({ name }) {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isInfoPath = matchPath(
    "/jobs/:id/reports/source-list-analytics",
    pathname
  );

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Analytics_${name}`,
  });

  const navLinks = [
    {
      to: `search-report`,
      path: `search-report`,
      label: "Search Report",
      component: <SearchReportTab id={id} />,
    },
    {
      to: `source-list-analytics`,
      path: `source-list-analytics`,
      label: "Source List Anayltics",
      component: <SearchAnalytics id={id} ref={componentRef} name={name} />,
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          disabled={!isInfoPath}
          color="primary"
          className="my-1"
          onClick={handlePrint}
        >
          <i className="ion-printer"></i> Print
        </Button>
      </div>
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
        <Route index element={<Navigate replace to="search-report" />} />
        {navLinks.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  );
}
export { JobsReport };
