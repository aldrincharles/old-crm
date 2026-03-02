import React, { useMemo, useEffect } from "react";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler, SimpleTable } from "components";
import { useSearchContext } from "../context/Search";
import { useTable } from "../context/TableProvider";
export const ReachoutBreakdown = ({ id }) => {
  const filter = useSearchContext();
  const table = useTable();
  const mergedState = useMemo(() => {
    return { ...filter, ...table };
  }, [filter, table]);
  const { data, errorMessage, isLoading, refetch, updateParams } = useFetch({
    initialUrl: `/analytics-report/sourcing-movement/reachout-count/${id}`,
    initialParams: mergedState,
  });

  const columns = useMemo(
    () => [
      {
        Header: "Gold",
        accessor: "gold",
        disableSortBy: true,
      },
      {
        Header: "Silver",
        accessor: "silver",
        disableSortBy: true,
      },
      {
        Header: "Bronze",
        accessor: "bronze",
        disableSortBy: true,
      },
    ],
    []
  );
  useEffect(() => {
    updateParams(mergedState);
  }, [mergedState, updateParams]);
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
