import React, { useMemo, useEffect } from "react";

import { useFetch } from "hooks";
import { AnimatedSmartTable, BarLoaderSpinner, ErrorHandler } from "components";
import { OrganizationContacts } from "./OrganizationContacts";
import { useTable } from "../context/TableProvider";
import { useSearchContext } from "../context/Search";

export const OrganizationTable = ({ id }) => {
  const filter = useSearchContext();
  const table = useTable();

  const mergedState = useMemo(() => {
    return { ...filter, ...table };
  }, [filter, table]);
  const { data, errorMessage, isLoading, refetch, updateParams } = useFetch({
    initialUrl: `/analytics-report/sourcing-movement/organization-mapout/${id}`,
    initialParams: mergedState,
  });

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: "organizationContacts",
        width: 35,
        Cell: ({ row }) => {
          return (
            <>
              <OrganizationContacts row={row} />
            </>
          );
        },
      },
      {
        Header: "Organization",
        accessor: "organization",
        disableSortBy: false,
      },
      {
        Header: "Gold",
        accessor: "gold",
        disableSortBy: false,
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
      {/* <div style={{ textAlign: "left", margin:"10px"}}>
        {"Items per page: "}
        <select
          disabled={isLoading}
          onChange={onPageSizeChange}
          value={table.size}
        >
          {[10, 20, 30, 40, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <Pagination
          isLoading={isLoading}
          currentPage={table.page}
          pageSize={table.size}
          totalCount={totalCount}
          onPageChange={onPageChange}
        />
      </div> */}
    </>
  );
};
