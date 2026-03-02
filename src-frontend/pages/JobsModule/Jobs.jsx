import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Card, CardBody } from "reactstrap";

import { NavLink, PageTitle } from "components";
import { useAxiosPrivate } from "hooks";

import {
  JobsDetailsMain,
  JobSourceMain,
  JobsReachOutMain,
  JobsReport,
} from "features/JobsModule";

const Jobs = () => {
  const authAxios = useAxiosPrivate();
  const [name, setName] = useState("");
  const { id } = useParams();
  const navData = useMemo(
    () => [
      {
        to: `details`,
        path: `details/*`,
        label: "Details",
        Component: JobsDetailsMain,
      },
      {
        to: `sourcing`,
        path: `sourcing/*`,
        label: "Sourcing",
        Component: JobSourceMain,
      },
      {
        to: `reachout`,
        path: `reachout/*`,
        label: "Reachout",
        Component: JobsReachOutMain,
      },
      {
        to: `reports`,
        path: `reports/*`,
        label: "Reports",
        Component: JobsReport,
      },
    ],
    []
  );

  useEffect(() => {
    const getData = async () => {
      const response = await authAxios.get(`/info/${id}?topic=job`);
      const result = response.data;
      setName(result.content.name);
    };

    getData();
  }, [authAxios, id]);

  return (
    <>
      <div className="d-flex flex-row-reverse">
        <Breadcrumb>
          {navData.map((link) => (
            <BreadcrumbItem key={link.to}>
              <NavLink
                activeClassName="breadcrumb-item active"
                activeStyle={{ cursor: "text" }}
                to={link.to}
              >
                {link.label}
              </NavLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </div>
      <Card className="mb-4">
        <CardBody>
          <h3>{name}</h3>
        </CardBody>
      </Card>

      <Routes>
        <Route index element={<Navigate replace to="details" />} />
        {navData.map(({ label, path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <>
                <PageTitle title={label} />
                {name ? <Component name={name} setName={setName} /> : null}
              </>
            }
          />
        ))}
      </Routes>
    </>
  );
};

export default Jobs;
