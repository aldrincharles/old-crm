import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

import { PageTitle, NavLink } from "components";
import { ClientUserMain, InternalMain } from "features/UsersModule";

const UsersMain = () => {
  const navLinks = [
    {
      label: "Internal",
      to: `internal`,
      path: `internal`,
      Component: InternalMain,
    },
    {
      label: "External",
      to: `external`,
      path: `external`,
      Component: ClientUserMain,
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-start">
        <h1>Users</h1>
      </div>

      <div className="d-flex flex-row-reverse">
        <Breadcrumb>
          {navLinks.map((link) => (
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
      <Routes>
        <Route index element={<Navigate replace to="internal" />} />
        {navLinks.map(({ path, label, Component }) => (
          <Route
            path={path}
            key={path}
            element={
              <>
                <PageTitle title={`${label} - Users`} />
                <Component />
              </>
            }
          />
        ))}
      </Routes>
    </>
  );
};

export default UsersMain;
