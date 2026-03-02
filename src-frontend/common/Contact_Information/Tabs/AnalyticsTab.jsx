import React, { useMemo } from "react";

import { BarLoaderSpinner, SimpleTable } from "components";

export const AnalyticsTab = ({ infoData, isLoading = true }) => {
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
      {isLoading && <BarLoaderSpinner />}
      <SimpleTable
        data={infoData?.display_contact_analytics || []}
        columns={columns}
        properties={{ height: "800px" }}
        isLoading={isLoading}
      />
    </>
  );
};
