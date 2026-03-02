/* eslint-disable react/display-name */
import React, { useMemo } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

import {
  AnimatedSmartTable,
  BarLoaderSpinner,
  ChartPie,
  ErrorHandler,
  Skeleton,
} from "components";
import { useFetch } from "hooks";
import { dateFormatter } from "utils";
import { ContactInformation } from "common";
import { SelectColumnFilter } from "components/UI/Table/Addons";

export const ForwardedCandidatesTable = ({ id }) => {
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/analytics-report/forwarded-candidates/${id}`,
  });

  const columns = useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "table_name",
      },
      {
        Header: "ORGANIZATION",
        accessor: "table_organization",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: () => null,
        id: "contactInformation",
        width: 75,
        disableFilters: true,
        Cell: ({ row: { original } }) => {
          return (
            <ContactInformation
              modal_contact_id={original.modal_contact_id}
              shortcut_linked_in={original.shortcut_linked_in}
            />
          );
        },
      },
      {
        Header: "SOURCE",
        accessor: "table_source",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "DATE FORWARDED",
        disableFilters: true,
        accessor: (data) => {
          let dt = data.date_forwarded
            ? dateFormatter(data.date_forwarded, {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
            : "-";
          return dt;
        },
      },
      {
        Header: "STATUS",
        accessor: "table_forward_status",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
    ],
    []
  );

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <Card className="my-3">
        <CardBody>
          <Row>
            <Col>
              <h3>Total Forwarded:</h3>
              <p className="fw-bold display-1">{data?.total_forwarded}</p>
            </Col>
            <Col>
              <p>Wating Feedback: {data?.waiting_feedback}</p>
              <p>For Interview: {data?.for_interview}</p>
              <p>Rejected: {data?.rejected}</p>
            </Col>
            <Col>
              {isLoading ? (
                <Skeleton
                  circle
                  style={{
                    width: 300,
                    height: 300,
                  }}
                />
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ChartPie
                    data={
                      [
                        {
                          name: "Waiting Feedback",
                          symbol: { fill: "#abbcd5" },
                          x: "Waiting Feedback",
                          y: data?.waiting_feedback,
                          fill: "#abbcd5",
                        },
                        {
                          name: "For Interview",
                          symbol: { fill: "#ffc107" },
                          x: "For Interview",
                          y: data?.for_interview,
                          fill: "#ffc107",
                        },
                        {
                          name: "Rejected",
                          symbol: { fill: "#fd9644" },
                          x: "Rejected",
                          y: data?.rejected,
                          fill: "#fd9644",
                        },
                      ] || []
                    }
                  />
                </div>
              )}
            </Col>
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
