import React, { useState } from "react";

import { Row, Col, Button, Container } from "reactstrap";
import {
  useParams,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { BootstrapModal, PageTitle, NavLink } from "components";
import { useToggle, useAxiosPrivate } from "hooks";
import {
  Analytics,
  Archive,
  Comments,
  Information,
  Other,
  Resume,
  Salary,
} from "features/ContactModule/Details";
import { toast } from "react-toastify";

const ContactDetails = () => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();
  const navigate = useNavigate();
  const [visible, toggle] = useToggle();
  const [isLoading, setIsLoading] = useState(false);

  const routes = [
    {
      to: `information`,
      path: `information`,
      label: "Information",
      Component: Information,
    },
    {
      to: `comments`,
      path: `comments`,
      label: "Comments",
      Component: Comments,
    },
    {
      to: `resume`,
      path: `resume`,
      label: "Resume",
      Component: Resume,
    },
    {
      to: `salary`,
      path: `salary`,
      label: "Salary",
      Component: Salary,
    },
    {
      to: `archive`,
      path: `archive`,
      label: "Archive",
      Component: Archive,
    },
    {
      to: `analytics`,
      path: `analytics`,
      label: "Analytics",
      Component: Analytics,
    },
    {
      to: `other`,
      path: `other`,
      label: "Other",
      Component: Other,
    },
  ];

  const handleConfirmation = () => {
    toggle();
    handleDelete();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const response = authAxios.delete(`/contact/${id}`);
    try {
      await toast.promise(response, {
        pending: {
          render() {
            return "Pending";
          },
        },
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: {
          render() {
            return "Oops! Something went wrong 🤯";
          },
        },
      });
      navigate("/contacts/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BootstrapModal isOpen={visible} toggle={toggle} backdrop="static">
        <BootstrapModal.Header>Warning</BootstrapModal.Header>
        <BootstrapModal.Body>
          <p>Are you sure you want to delete?</p>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button color="danger" onClick={handleConfirmation}>
            Delete
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>

      <Row>
        <Col lg="auto" className="d-flex justify-content-start">
          <h1>CONTACT DETAILS</h1>
        </Col>
        <Col className="mb-2 d-flex justify-content-end">
          <Button disabled={isLoading} color="danger" onClick={toggle}>
            {isLoading ? "Processing" : "Delete"}
          </Button>
        </Col>
      </Row>

      <div className="mb-3">
        <ul className="nav justify-content-center nav-tabs">
          {routes.map(({ to, label }) => (
            <li className="nav-item" key={to}>
              <NavLink className="nav-link" activeClassName="active" to={to}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Routes>
        <Route index element={<Navigate replace to="information" />} />
        {routes.map(({ path, label, Component }) => (
          <Route
            path={path}
            key={path}
            element={
              <>
                <PageTitle title={`${label} - Contacts`} />
                <Container>
                  <Component />
                </Container>
              </>
            }
          />
        ))}
      </Routes>
    </>
  );
};
export default ContactDetails;
