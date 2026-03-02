import React, { useMemo, useEffect } from "react";

import { useFetch } from "hooks";
import { ErrorHandler, BarLoaderSpinner, AnimatedSmartTable } from "components";
import { useSearchContext } from "../context/Search";
import { useTable } from "../context/TableProvider";
export const IndustryTable = ({ id }) => {
  const filter = useSearchContext();
  const table = useTable();
  // const setTable = useOrganizationTableDispatch();
  const mergedState = useMemo(() => {
    return { ...filter, ...table };
  }, [filter, table]);
  const { data, errorMessage, isLoading, refetch, updateParams } = useFetch({
    initialUrl: `/analytics-report/sourcing-movement/industry-mapout/${id}`,
    initialParams: mergedState,
  });

  const columns = useMemo(
    () => [
      {
        Header: "Industry",
        accessor: "industry",
        disableSortBy: false,
      },
      {
        Header: "Gold",
        accessor: "gold",
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: "Silver",
        accessor: "silver",
        disableSortBy: false,
        disableFilters: true,
      },
      {
        Header: "Bronze",
        accessor: "bronze",
        disableSortBy: false,
        disableFilters: true,
      },
      {
        Header: "Rejected",
        accessor: "rejected",
        disableSortBy: false,
        disableFilters: true,
      },
      {
        Header: "Total",
        accessor: "total",
        disableSortBy: false,
        disableFilters: true,
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
      <AnimatedSmartTable
        data={data || []}
        columns={columns}
        properties={{ height: "400px" }}
      />
    </>
  );
};
