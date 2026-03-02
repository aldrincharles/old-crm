import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";

import { PageTitle, NavLink } from "components";
import { ContactListMain } from "features/ContactModule/List";
import { ContactAnalyticsMain } from "features/ContactModule/Analytics";

const Contacts = () => {
  const navLinks = [
    {
      label: "Dashboard",
      to: `dashboard`,
      path: `dashboard`,
      Component: ContactListMain,
    },
    {
      label: "Analytics",
      to: `analytics`,
      path: `analytics`,
      Component: ContactAnalyticsMain,
    },
  ];

  return (
    <>
      <Row>
        <Col lg="auto" className="d-flex justify-content-start">
          <h1>CONTACTS</h1>
        </Col>
        <Col className="mb-2 d-flex justify-content-end">
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
        </Col>
      </Row>
      <Routes>
        <Route index element={<Navigate replace to="dashboard" />} />
        {navLinks.map(({ path, label, Component }) => (
          <Route
            path={path}
            key={path}
            element={
              <>
                <PageTitle title={`${label} - Contacts`} />
                <Component />
              </>
            }
          />
        ))}
      </Routes>
    </>
  );
};

export default Contacts;
