/* eslint-disable react/display-name */
import React, { useContext, useMemo } from "react";

import { FetchContext } from "context/FetchContext";
import { FetchFilterContext, pageSort } from "context/FetchFilter";
import { ContactInformation } from "common";
import { BarLoaderSpinner, ErrorHandler, SimpleTable } from "components";

export const EmployeesDisplay = () => {
  const { data, isLoading, error, retrieveData } = useContext(FetchContext);
  const { state, dispatch } = useContext(FetchFilterContext);

  const columnHeaderClick = (column) => {
    switch (column.sortDirection) {
      case "none":
        dispatch(pageSort("ASC", column.id));
        break;
      case "ASC":
        dispatch(pageSort("DESC", column.id));
        break;
      case "DESC":
        dispatch(pageSort("none", column.id));
        break;
      default:
        return null;
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "name",
        sortDirection: state.accessor === "name" ? state.direction : "none",
      },
      {
        Header: () => null,
        id: "contactInformation",
        width: 75,
        disableFilters: true,
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
        Header: "POSITION",
        accessor: "position",
        sortDirection: state.accessor === "position" ? state.direction : "none",
      },
      {
        Header: "LOCATION",
        accessor: "location",
        sortDirection: state.accessor === "location" ? state.direction : "none",
      },
    ],
    [state.accessor, state.direction]
  );

  if (error) return <ErrorHandler minHeight={25} onRetry={retrieveData} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <SimpleTable
        isLoading={isLoading}
        columns={columns}
        data={data}
        properties={{ height: 400 }}
        onHeaderClick={columnHeaderClick}
      />
    </>
  );
};
