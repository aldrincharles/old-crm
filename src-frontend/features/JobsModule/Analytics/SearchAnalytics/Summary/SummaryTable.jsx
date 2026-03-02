import React, { useMemo } from "react";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler, SimpleTable } from "components";

export const SummaryTable = ({ id }) => {
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/analytics-report/sourcing-movement/strategy-mapout/${id}`,
  });

  const columns = useMemo(
    () => [
      {
        Header: "Strategy",
        accessor: "strategy",
        disableSortBy: true,
      },
      {
        Header: "Total Companies",
        accessor: "total_companies",
        disableSortBy: true,
      },
      {
        Header: "Total Companies in location /w candidates",
        accessor: "total_companies_candidates",
        disableSortBy: true,
      },
    ],
    []
  );

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <SimpleTable
        data={data || []}
        columns={columns}
        properties={{ height: "auto" }}
      />
    </>
  );
};
