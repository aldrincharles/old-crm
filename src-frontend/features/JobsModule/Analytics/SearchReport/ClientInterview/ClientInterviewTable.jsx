/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
import { AnimatedSmartTable, ErrorHandler, BarLoaderSpinner } from "components";

export const ClientInterviewTable = ({ id }) => {
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/analytics-report/client-interviews/${id}`,
  });

  const [columns, setColumns] = useState([
    {
      Header: () => null,
      id: "id",
      sticky: "left",
      columns: [
        {
          Header: "STRATEGY INDEX",
          accessor: "id",
          disableFilters: true,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (!data || data?.length === 0) return;

    data[0]?.client_interview_data?.map((data, key) => {
      setColumns((previousValue) => [
        ...previousValue,
        {
          Header: data?.stage,
          columns: [
            {
              Header: "NEXT",
              accessor: `client_interview_data[${key}].next`,
              disableFilters: true,
            },
            {
              Header: "PENDING",
              accessor: `client_interview_data[${key}].pending`,
              disableFilters: true,
            },
            {
              Header: "REJECTED",
              accessor: `client_interview_data[${key}].rejected`,
              disableFilters: true,
            },
          ],
        },
      ]);
    });
  }, [data]);

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <AnimatedSmartTable data={data || []} columns={columns} />
    </>
  );
};
