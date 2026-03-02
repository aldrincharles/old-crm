/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Table,
  Badge,
  ButtonGroup,
  Button,
  Container,
} from "reactstrap";

import {
  IconLinkButton,
  BootstrapModal,
  BarLoaderSpinner,
  ErrorHandler,
} from "components";
import { useFetch, useToggle, useAxiosPrivate } from "hooks";
import { ContactInformation, EditableDetail, ListItems } from "common";
import { OrganizationListEdit } from "./OrganizationListEdit";
import { toast } from "react-toastify";
import { RevenueMain } from "./Revenue/RevenueMain";
import { CompetitorsMain } from "./Competitors/CompetitorsMain";
import { AcquisitionsMain } from "./Acquisitions/AcquisitionsMain";
import { SubCategoryMain } from "./SubCategory/SubCategoryMain";
import { EmployeeBenefitsMain } from "./EmployeeBenefits/EmployeeBenefitsMain";
import { StockDetailsMain } from "./StockDetails/StockDetailsMain";
import { currencyFormatter, numberCommaFormat } from "utils";

const OrganizationDetails = () => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();
  const navigate = useNavigate();
  const [visible, toggle] = useToggle();
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/organization/${id}`,
  });
  const [buttonState, setButtonState] = useState(true);

  const handleConfirmation = () => {
    toggle();
    handleDelete();
  };

  const handleDelete = async () => {
    setButtonState(false);
    const response = authAxios.delete(`/organization/${id}`);

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
      navigate("/organizations");
    } finally {
      setButtonState(true);
    }
  };

  const contents = [
    {
      label: "Ranking",
      value: data?.ranking?.label,
    },
    {
      label: "Industry",
      value: data?.industry?.label,
    },
    {
      label: "Vertical",
      value: data?.vertical?.label,
    },
    {
      label: "Solution Type",
      value: data?.solution_type?.label,
    },
    {
      label: "Classification",
      value: data?.classification?.label,
    },
    {
      label: "Employee Size",
      value: data?.no_of_people,
    },
    {
      label: "Global Employee Size",
      value: data? numberCommaFormat(data.global_employee_size):0,
    },

    {
      label: "Global HQ",
      value: data?.global_hq?.label,
    },
    {
      label: "Local Company",
      value: data?.local_company?.label,
    },
    {
      label: "APAC HQ",
      value: data?.apac_hq?.label,
    },
    {
      label: "APAC Offices",
      value:
        data?.apac_offices?.length > 0 &&
        data?.apac_offices.map((data, index) => (
          <Badge className="me-2" color="info" key={index}>
            {data.label}
          </Badge>
        )),
    },
  ];

  if (errorMessage) return <ErrorHandler onRetry={refetch} />;

  return (
    <>
      <BootstrapModal isOpen={visible} toggle={toggle} backdrop="static">
        <BootstrapModal.Header>Warning</BootstrapModal.Header>
        <BootstrapModal.Body>
          <p>
            Are you sure you want to delete <b>{data?.name}</b>?
          </p>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button color="danger" onClick={handleConfirmation}>
            Delete
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>

      <Container>
        <Row>
          <Col style={{ textAlign: "left" }}>
            <IconLinkButton
              href={data?.website}
              target="_blank"
              rel="noreferrer"
              className="me-2 fas fa-globe"
            />
            {data?.client?.label === "RaaS" && (
              <img rel="icon" src="/assets/raas-icon.png" />
            )}
            {data?.client?.label === "ITEL" && (
              <img rel="icon" src="/assets/itel-icon.png" />
            )}
          </Col>
          {data && (
            <Col style={{ textAlign: "right" }}>
              <ButtonGroup vertical className="me-2">
                <OrganizationListEdit data={data} id={id} onRefetch={refetch} />
              </ButtonGroup>
              <ButtonGroup>
                <Button disabled={!buttonState} color="danger" onClick={toggle}>
                  {buttonState ? <div>Delete</div> : <div>Processing...</div>}
                </Button>
              </ButtonGroup>
            </Col>
          )}
        </Row>

        {isLoading && <BarLoaderSpinner />}
        <Table borderless className="mt-2">
          <thead>
            <tr>
              {contents.map((content, index) => (
                <th key={index}>{content.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {contents.map((content, index) => (
                <td key={index}>{content.value}</td>
              ))}
            </tr>
          </tbody>
        </Table>

        <h3 className="mt-5" style={{ textAlign: "left" }}>
          Fiscal Calendar
        </h3>
        <Table borderless className="mt-2">
          <thead>
            <tr>
              <th>Quarter 1</th>
              <th>Quarter 2</th>
              <th>Quarter 3</th>
              <th>Quarter 4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {data?.fiscal_calendar.map((content) => (
                <td key={content.quarter_end}>{content.quarter_end}</td>
              ))}
            </tr>
          </tbody>
        </Table>
        <StockDetailsMain id={id}></StockDetailsMain>
        <hr></hr>
        <div>
          <h3 className="mb-3">CEO and ASIA VP</h3>

          <Table borderless>
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
                <th>Job Title</th>
                <th>Position</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {data?.management?.length > 0 &&
                data.management.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>
                      <ContactInformation
                        modal_contact_id={item.contact_id}
                        shortcut_linked_in={item.linked_in}
                      />
                    </td>
                    <td>{item.job_title}</td>
                    <td>{item.position}</td>
                    <td>{item.location}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <hr></hr>

        <div className="mt-5" style={{ textAlign: "left" }}>
          <EditableDetail
            url={`/organization/details/${id}/pitch-to-candidate`}
            title="Company Pitch to Candidate"
          />
          <EditableDetail
            url={`/organization/details/${id}/mission-vision`}
            title="Mission and Vision Statement"
          />
          <EditableDetail
            url={`/organization/details/${id}/history`}
            title="History"
          />
          <EditableDetail
            url={`/organization/situation/${id}/culture-statement`}
            title="Culture Statement"
          />
          <EditableDetail
            url={`/organization/details/${id}/preferred-sales-profile`}
            title="Preferred Sales Profile"
          />
        </div>
        <hr></hr>
        <RevenueMain id={id}></RevenueMain>
        <hr></hr>
        <Row>
          <Col>
            <ListItems
              title="Solutions/Products"
              url={`/organization/situation/${id}/solutions-products`}
            ></ListItems>
          </Col>
          <Col>
            <SubCategoryMain id={id}></SubCategoryMain>
          </Col>
        </Row>

        <hr></hr>
        <ListItems
          title="Partner Ecosystem"
          url={`/organization/asia-overview/${id}/partner-ecosystem`}
        />
        <hr></hr>

        <CompetitorsMain id={id}></CompetitorsMain>

        <hr></hr>
        <AcquisitionsMain id={id}></AcquisitionsMain>
        <hr></hr>
        <EmployeeBenefitsMain id={id}></EmployeeBenefitsMain>
      </Container>
    </>
  );
};

export { OrganizationDetails };
