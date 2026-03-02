/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

import { useFetch } from "hooks";
import {
  AnimatedSmartTable,
  ChartPie,
  ErrorHandler,
  BarLoaderSpinner,
} from "components";
import { ContactInformation } from "common";
import { SelectColumnFilter } from "components/UI/Table/Addons";
import { InternalInterviewEdit } from "./InternalInterviewEdit";
import Skeleton from "react-loading-skeleton";

export const InternalInterviewTable = ({ id }) => {
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/analytics-report/internal-interview/${id}`,
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
        Header: "STATUS",
        accessor: "table_forward_status",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "LAST CONTACTED",
        accessor: "table_date_last_contacted",
        disableFilters: true,
      },
      {
        Header: "FOLLOW UPS",
        accessor: "table_number_of_followups",
        disableFilters: true,
      },
      {
        Header: () => null,
        id: "editModal",
        width: 75,
        disableFilters: true,
        Cell: ({ row, updateMyData }) => {
          const { index } = row;
          const { interview_data_id } = row.original;

          const handleUpdate = (data) => {
            Object.keys(data).map((key) => {
              updateMyData(index, key, data[key]);
            });
          };

          return (
            <InternalInterviewEdit
              interview_data_id={interview_data_id}
              onUpdateValues={handleUpdate}
            />
          );
        },
      },
    ],
    []
  );

  const handleUpdate = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <Card className="my-3">
        <CardBody>
          <Row>
            <Col>
              <h3>Total Screened:</h3>
              <p className="fw-bold display-1">{data?.total_screened}</p>
            </Col>
            <Col>
              <p>Pending to Screen: {data?.pending}</p>
              <p>Scheduled: {data?.scheduled}</p>
              <p>Rejected: {data?.rejected}</p>
              <p>Pending to Forward: {data?.pending_forward}</p>
              <p>Forwarded: {data?.forwarded}</p>
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
                          name: "Pending",
                          symbol: { fill: "#abbcd5" },
                          x: "Pending",
                          y: data?.pending,
                          fill: "#abbcd5",
                        },
                        {
                          name: "Scheduled",
                          symbol: { fill: "#ffc107" },
                          x: "Scheduled",
                          y: data?.scheduled,
                          fill: "#ffc107",
                        },
                        {
                          name: "Rejected",
                          symbol: { fill: "#fd9644" },
                          x: "Rejected",
                          y: data?.rejected,
                          fill: "#fd9644",
                        },
                        {
                          name: "Forwarded",
                          symbol: { fill: "#42ba96" },
                          x: "Forwarded",
                          y: data?.forwarded,
                          fill: "#42ba96",
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
        updateMyData={handleUpdate}
        overflow
      />
    </>
  );
};
