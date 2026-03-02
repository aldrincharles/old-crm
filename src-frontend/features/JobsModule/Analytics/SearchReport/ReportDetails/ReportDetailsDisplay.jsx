import React from "react";

import { Col, Row, Table } from "reactstrap";

import { dateFormatter } from "utils";
import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";

export const ReportDetailsDisplay = ({ id }) => {
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/analytics-report/get-details/${id}`,
  });

  const contents = [
    {
      label: "Organization",
      value: data?.organization,
    },
    {
      label: "Search",
      value: data?.search,
    },
    {
      label: "Location",
      value: data?.location,
    },
    {
      label: "Search Activated",
      value: data?.search_activated
        ? dateFormatter(
            data.search_activated,
            // "YYYY-MM-DD"
            {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }
          )
        : null,
    },
    {
      label: "Hiring Manager",
      value: data?.hiring_manager,
    },
    {
      label: "Researcher",
      value: data?.researcher,
    },
  ];

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <Row className="my-3">
      <Col>
        {isLoading && <BarLoaderSpinner />}
        <Table bordered>
          <tbody>
            {contents.map((content, index) => (
              <tr key={index}>
                <td>{content.label}</td>
                <td>{content.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
      <Col></Col>
    </Row>
  );
};
