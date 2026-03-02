/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { AnimatedSmartTable } from "components";
import { gradingColor } from "constants";

export const CDJobsExportedDisplay = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "JOB",
        accessor: "job",
        disableFilters: true,
      },
      {
        Header: "ClIENT",
        accessor: "client",
        disableFilters: true,
      },
      {
        Header: "POSITION",
        accessor: "position",
        disableFilters: true,
      },
      {
        Header: "LOCATION",
        accessor: "location",
        disableFilters: true,
      },
      {
        Header: "VERIFIED GRADE",
        accessor: "verified_grade",
        disableFilters: true,
        Cell: ({ row }) => {
          const { verified_grade } = row.original;
          return (
            <span className={`badge ${gradingColor[verified_grade][0]}`}>
              {gradingColor[verified_grade][1]}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <AnimatedSmartTable data={data || []} columns={columns} paginated />
    </>
  );
};
