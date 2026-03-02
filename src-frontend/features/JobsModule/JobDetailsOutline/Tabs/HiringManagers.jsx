import React from "react";

import { Button, ButtonGroup, Card, Table } from "reactstrap";

import { useFetch, useToggle } from "hooks";
import { BarLoaderSpinner, BootstrapModal, ErrorHandler } from "components";
import { ContactInformation } from "common";
import { ContentModal } from "../ContentModal";
import { Link } from "react-router-dom";
export const HiringManagers = ({ id }) => {
  const [visible, toggle] = useToggle();
  const { data, errorMessage, isLoading, refetch } = useFetch({
    initialUrl: `jobs/${id}/details/outline/hiring-managers`,
  });
  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      <h3 className="my-2">Hiring Managers</h3>
      <Card>
        {isLoading && <BarLoaderSpinner />}
        <Table bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
              <th>General Overview</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data.map((hiringManager, index) => (
                <tr key={index}>
                  <td>
                    <Link
                      to={`/contacts/details/${hiringManager.contact_id}`}
                      target="_blank"
                    >
                      {hiringManager.name}
                    </Link>
                  </td>
                  <td>
                    <ContactInformation
                      modal_contact_id={hiringManager.contact_id}
                      shortcut_linked_in={hiringManager.linked_in}
                    ></ContactInformation>
                  </td>
                  <td>{hiringManager.general_overview}</td>
                  {/* <td>{hiringManager.career_summary}</td>
                  <td>{hiringManager.interview_style}</td> */}
                  <td>
                    <CareerSummaryModal
                      data={hiringManager.career_summary}
                      toggle={toggle}
                      visible={visible}
                    ></CareerSummaryModal>
                    <ButtonGroup vertical>
                      <Button
                        style={{ textAlign: "left" }}
                        className="my-1"
                        color="info"
                        onClick={toggle}
                      >
                        <i className="ion-eye me-3"></i>
                        Career Summary
                      </Button>
                      <ContentModal
                        contactName={hiringManager.name}
                        title={"Interview Style"}
                        content={hiringManager.interview_style}
                      ></ContentModal>
                      <ContentModal
                        contactName={hiringManager.name}
                        title={"Interview Questions"}
                        content={hiringManager.interview_questions}
                      ></ContentModal>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
};

const CareerSummaryModal = ({ data, toggle, visible }) => {
  return (
    <>
      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>Career Summary</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Card style={{ overflowY: "auto" }}>
            {data.length > 0 &&
              data.map((item, i) => (
                <>
                  <Table key={i}>
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Organization</td>
                        <td>{item.organization_name}</td>
                      </tr>
                      <tr>
                        <td>Job Title</td>
                        <td>{item.job_title}</td>
                      </tr>
                      <tr>
                        <td>Position</td>
                        <td>{item.job_title}</td>
                      </tr>
                      <tr>
                        <td>Length of Stay (Role)</td>
                        <td>{`${item.tenure_length.years} YRS. & ${item.tenure_length.months} MOS.`}</td>
                      </tr>
                      <tr>
                        <td>Position Start Date</td>
                        <td>{`${item.role_start_date}`}</td>
                      </tr>
                      <tr>
                        <td>Company Start Date</td>
                        <td>{`${item.company_start_date}`}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <hr></hr>
                </>
              ))}
          </Card>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
