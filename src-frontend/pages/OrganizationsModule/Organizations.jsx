import React, { useMemo, useEffect, useState } from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Card, CardBody } from "reactstrap";

import { useAxiosPrivate } from "hooks";
import { PageTitle, NavLink } from "components";
import {
  OrganizationDetails,
  OrganizationChart,
  OrganizationPeople,
  OrganizationSituation,
  OrganizationSearchSupport,
} from "features/OrganizationModule";

const Organizations = () => {
  const authAxios = useAxiosPrivate();
  const [name, setName] = useState("");
  const { id } = useParams();

  const navData = useMemo(
    () => [
      {
        to: `details`,
        path: `details`,
        label: "Details",
        Component: OrganizationDetails,
      },
      {
        to: `situation`,
        path: `situation`,
        label: "Situation",
        Component: OrganizationSituation,
      },
      {
        to: `people`,
        path: `people`,
        label: "People",
        Component: OrganizationPeople,
      },
      {
        to: `org-chart`,
        path: `org-chart/*`,
        label: "Org Chart",
        Component: OrganizationChart,
      },
      {
        to: `search-support`,
        path: `search-support`,
        label: "Search Support",
        Component: OrganizationSearchSupport,
      },
    ],
    []
  );

  useEffect(() => {
    const getData = async () => {
      const response = await authAxios.get(`/info/${id}?topic=organization`);
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
        {navData.map(({ path, label, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <>
                <PageTitle title={`${label} - Organizations`} />
                <Component />
              </>
            }
          />
        ))}
      </Routes>
    </>
  );
};

export default Organizations;
