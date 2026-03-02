import React, { useMemo, useRef, useState } from "react";

import {
  useParams,
  useNavigate,
  Routes,
  Route,
  Navigate,
  matchPath,
  useLocation,
} from "react-router-dom";
import { Button, ButtonGroup, Container } from "reactstrap";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";

import { BootstrapModal, NavLink } from "components";
import { useToggle, useAxiosPrivate } from "hooks";

import { InformationMain } from "./Information/InformationMain";
import { RoadMapMain } from "./Roadmap/RoadMapMain";
import { SLAMain } from "./SLA/SLAMain";
import { JobDetailsOutlineMain } from "../JobDetailsOutline/JobDetailsOutlineMain";

const JobsDetailsMain = ({ name }) => {
  const { pathname } = useLocation();
  const isInfoPath = matchPath("/jobs/:id/details/information", pathname);

  const componentRef = useRef();

  const { id } = useParams();
  const authAxios = useAxiosPrivate();
  const navigate = useNavigate();

  const [buttonState, setButtonState] = useState(true);
  const [visible, toggle] = useToggle();

  const navLinks = useMemo(
    () => [
      {
        to: `information`,
        path: `information`,
        label: "Information",
        Component: <InformationMain ref={componentRef} name={name} />,
      },
      {
        to: `roadmap`,
        path: `roadmap`,
        label: "Road map",
        Component: <RoadMapMain />,
      },
      {
        to: `sla`,
        path: `sla`,
        label: " SLA",
        Component: <SLAMain />,
      },
    ],
    [name]
  );

  const handleConfirmation = () => {
    toggle();
    handleDelete();
  };

  const handleDelete = async () => {
    setButtonState(false);
    const response = authAxios.delete(`/jobs/${id}`, { job_id: id });
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
      navigate("/");
    } finally {
      setButtonState(true);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `CSAD_${name}`,
  });

  return (
    <>
      <BootstrapModal isOpen={visible} toggle={toggle} backdrop="static">
        <BootstrapModal.Header>Warning</BootstrapModal.Header>
        <BootstrapModal.Body>
          <p>
            Are you sure you want to delete <b>&quot;{name}&quot;</b>?
          </p>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            className="d-flex justify-content-end"
            color="danger"
            onClick={handleConfirmation}
          >
            Delete
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>

      <div className="d-flex justify-content-end">
        <ButtonGroup horizontal>
          <JobDetailsOutlineMain></JobDetailsOutlineMain>
          <Button
            disabled={!isInfoPath}
            color="primary"
            onClick={handlePrint}
          >
            <>
              <i className="ion-printer"></i> Print
            </>
          </Button>
          <Button color="danger" onClick={toggle}>
            {buttonState ? <div>Delete</div> : <div>Processing...</div>}
          </Button>
        </ButtonGroup>
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
        <Route index element={<Navigate replace to="information" />} />
        {navLinks.map(({ Component, path }) => (
          <Route
            key={path}
            path={path}
            element={<Container>{Component}</Container>}
          />
        ))}
      </Routes>
    </>
  );
};
export { JobsDetailsMain };
