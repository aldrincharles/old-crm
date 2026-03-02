import React, { useMemo } from "react";

import { AnimatedSmartTable } from "components";

export const CDLatestActivityDisplay = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "ACTION",
        accessor: "action",
        disableFilters: true,
      },
      {
        Header: "JOB",
        accessor: "job",
        disableFilters: true,
      },
      {
        Header: "DATE",
        accessor: "date",
        disableFilters: true,
      },
      {
        Header: "DONE BY",
        accessor: "done_by",
        disableFilters: true,
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
