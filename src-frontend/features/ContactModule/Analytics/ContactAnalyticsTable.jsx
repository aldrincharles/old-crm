import React, { useEffect, useMemo } from "react";

import {
  BarLoaderSpinner,
  ErrorHandler,
  Pagination,
  SimpleTable,
} from "components";
import { ContactInformation } from "common";
import { useFetch } from "hooks";

import { useSearchContext } from "./context/Search";
import {
  useContactTable,
  useContactTableDispatch,
  pageNext,
  pageSize,
  pageSort,
} from "./context/Contacts";

const ContactAnalyticsTable = () => {
  const filter = useSearchContext();
  const table = useContactTable();
  const setTable = useContactTableDispatch();

  const mergedState = useMemo(() => {
    return { ...filter, ...table };
  }, [filter, table]);

  const { data, errorMessage, isLoading, totalCount, refetch, updateParams } =
    useFetch({
      initialUrl: `/contacts/analytics/table`,
      initialParams: mergedState,
    });

  const onPageSizeChange = (event) => {
    let size = event.target.value;
    if (table.page === size) return;
    setTable(pageSize(event.target.value));
  };

  const onPageChange = (page) => {
    if (table.page === page) return;
    setTable(pageNext(page));
  };

  const columnHeaderClick = (column) => {
    switch (column.sortDirection) {
      case "none":
        setTable(pageSort("ASC", column.id));
        break;
      case "ASC":
        setTable(pageSort("DESC", column.id));
        break;
      case "DESC":
        setTable(pageSort("none", ""));
        break;
      default:
        return null;
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "contact_name",
        sortDirection:
          table.accessor === "contact_name" ? table.direction : "none",
      },
      {
        Header: () => null,
        id: "contactInformation",
        width: 75,
        Cell: ({ row: { original } }) => {
          return (
            <>
              <ContactInformation
                modal_contact_id={original.contact_id}
                shortcut_linked_in={original.linked_in}
              />
            </>
          );
        },
      },
      {
        Header: "ORGANIZATION",
        accessor: "organization.name",
        sortDirection:
          table.accessor === "organization.name" ? table.direction : "none",
      },
      {
        Header: "POSITION",
        accessor: "contact_position",
        sortDirection:
          table.accessor === "contact_position" ? table.direction : "none",
      },
      {
        Header: "LOCATION",
        accessor: "contact_location",
        sortDirection:
          table.accessor === "contact_location" ? table.direction : "none",
      },
      {
        Header: "GEOGRAPHY",
        accessor: "contact_geography",
        sortDirection:
          table.accessor === "contact_geography" ? table.direction : "none",
      },
    ],
    [table.accessor, table.direction]
  );

  useEffect(() => {
    updateParams(mergedState);
  }, [mergedState, updateParams]);

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <SimpleTable
        columns={columns}
        data={data || []}
        properties={{ height: 400 }}
        onHeaderClick={columnHeaderClick}
      />

      <div style={{ textAlign: "left" }}>
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
      </div>
    </>
  );
};
export { ContactAnalyticsTable };
