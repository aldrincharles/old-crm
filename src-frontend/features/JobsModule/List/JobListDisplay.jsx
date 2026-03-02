/* eslint-disable react/display-name */
import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import { FetchContext } from "context/FetchContext";
import { FetchFilterContext, pageSort } from "context/FetchFilter";
import { BarLoaderSpinner, ErrorHandler, SimpleTable } from "components";
import { badgeStatus } from "constants";

export const JobListDisplay = () => {
  const { state, dispatch } = useContext(FetchFilterContext);
  const { data, isLoading, error, retrieveData } = useContext(FetchContext);

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
        Header: "POSITION",
        accessor: "job_name",
        sortDirection: state.accessor === "job_name" ? state.direction : "none",
        Cell: ({ row: { original } }) => {
          return <Link to={`/jobs/${original.id}`}>{original.job_name}</Link>;
        },
      },
      {
        Header: () => null,
        id: "statusDisplay",
        width: 35,
        Cell: ({ row: { original } }) => {
          return <i className={`${badgeStatus[original.status]}`} />;
        },
      },
      {
        Header: "STATUS",
        accessor: "status",
        sortDirection: state.accessor === "status" ? state.direction : "none",
      },
      {
        Header: "ORGANIZATION",
        accessor: "organization.name",
        sortDirection:
          state.accessor === "organization.name" ? state.direction : "none",
      },
      {
        Header: "CATEGORY",
        accessor: "activation_document.search_category",
        sortDirection:
          state.accessor === "activation_document.search_category"
            ? state.direction
            : "none",
      },
      {
        Header: "LOCATION",
        accessor: "activation_document.location",
        sortDirection:
          state.accessor === "activation_document.location"
            ? state.direction
            : "none",
      },
    ],
    [state.accessor, state.direction]
  );

  if (error) return <ErrorHandler onRetry={retrieveData} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <SimpleTable
        columns={columns}
        data={data}
        properties={{ height: 625 }}
        onHeaderClick={columnHeaderClick}
        isLoading={isLoading}
      />
    </>
  );
};
