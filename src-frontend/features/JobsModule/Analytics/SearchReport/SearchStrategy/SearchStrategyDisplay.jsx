import React, { useMemo } from "react";

import { useFetch } from "hooks";
import { AnimatedSmartTable, ErrorHandler, BarLoaderSpinner } from "components";

export const SearchStrategyDisplay = ({ id }) => {
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/analytics-report/get-search-strategies/${id}`,
  });

  const columns = useMemo(
    () => [
      {
        Header: "#",
        width: 35,
        accessor: "strategy_index",
        disableFilters: true,
      },
      {
        Header: "STATUS",
        width: 100,
        accessor: "status",
        disableFilters: true,
      },
      {
        Header: "SEARCH STRATEGY",
        width: 400,
        accessor: "search_strategy",
        disableFilters: true,
      },
    ],
    []
  );
  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <AnimatedSmartTable data={data || []} columns={columns} overflow />
    </>
  );
};
