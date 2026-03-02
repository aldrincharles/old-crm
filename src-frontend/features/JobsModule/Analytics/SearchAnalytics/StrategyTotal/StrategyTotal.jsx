import React, { useMemo, useEffect } from "react";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler, SimpleTable } from "components";
import { useTable } from "../context/TableProvider";
import { useSearchContext } from "../context/Search";

export const StrategyTotal = ({ id }) => {
  const filter = useSearchContext();
  const table = useTable();
  // const setTable = useTableDispatch();
  const mergedState = useMemo(() => {
    return { ...filter, ...table };
  }, [filter, table]);

  const { data, errorMessage, isLoading, refetch, updateParams } = useFetch({
    initialUrl: `/analytics-report/sourcing-movement/strategy-total/${id}`,
    initialParams: mergedState,
  });

  const columns = useMemo(
    () => [
      {
        Header: "Strategy",
        accessor: "strategy",
        disableSortBy: true,
      },
      {
        Header: "Total Catchment Zone",
        accessor: "total",
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
