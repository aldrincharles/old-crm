import React from "react";

import { Card, CardBody, Row, Col } from "reactstrap";
import { useFetch } from "hooks";
import { AnimatedSmartTable, ErrorHandler, BarLoaderSpinner } from "components";

export const SourcingResponsesDisplay = ({ id }) => {
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/analytics-report/get-sourcing-responses/${id}`,
  });

  const columns = [
    {
      Header: "SOURCING",
      columns: [
        {
          Header: "Strat",
          accessor: "strategy_index",
          disableFilters: true,
        },
        {
          Header: "COMPANIES",
          accessor: "companies",
          disableFilters: true,
        },
        {
          Header: "CATCHMENT ZONE",
          accessor: "catchment_zone",
          disableFilters: true,
        },
        {
          Header: "GOLD",
          accessor: "gold",
          disableFilters: true,
        },
        {
          Header: "SILVER",
          accessor: "silver",
          disableFilters: true,
        },
        {
          Header: "BRONZE",
          accessor: "bronze",
          disableFilters: true,
        },
        {
          Header: "NO",
          accessor: "no",
          disableFilters: true,
        },
        {
          Header: "REACH OUT",
          accessor: "reach_out",
          disableFilters: true,
        },
      ],
    },
    {
      Header: "RESPONSES",
      columns: [
        {
          Header: "INTERESTED",
          accessor: "interested",
          disableFilters: true,
        },
        {
          Header: "NOT INTERESTED",
          accessor: "not_interested",
          disableFilters: true,
        },
        {
          Header: "NO RESPONSE",
          accessor: "no_response",
          disableFilters: true,
        },
        {
          Header: "RESPONSE",
          accessor: "response_rate",
          disableFilters: true,
        },
      ],
    },
  ];

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <Card className="my-3">
        <CardBody>
          <Row>
            <Col></Col>
            <Col style={{ textAlign: "left" }}>
              <h3>Sourcing:</h3>
              <p>Total Companies: {data?.total_number_of_companies}</p>
              <p>Total Catchment Zone: {data?.total_catchment}</p>
              <p>Total Gold: {data?.total_gold}</p>
              <p>Total Silver: {data?.total_silver}</p>
              <p>Total Bronze: {data?.total_bronze}</p>
              <p>Total Rejected: {data?.total_rejected}</p>
              <p>Total Reach Out: {data?.total_ro}</p>
            </Col>
            <Col style={{ textAlign: "left" }}>
              <h3>Responses:</h3>
              <p>Total Interested: {data?.total_ro_interested}</p>
              <p>Total Not Interested: {data?.total_ro_not_interested}</p>
              <p>Total No Response: {data?.total_ro_no_response}</p>
            </Col>
            <Col></Col>
          </Row>
        </CardBody>
      </Card>
      <AnimatedSmartTable
        data={data?.output || []}
        columns={columns}
        overflow
      />
    </>
  );
};
