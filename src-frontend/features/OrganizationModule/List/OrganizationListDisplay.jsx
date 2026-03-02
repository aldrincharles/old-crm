import React, { useContext, useMemo } from "react";

import { Link } from "react-router-dom";

import { BarLoaderSpinner, ErrorHandler, SimpleTable } from "components";
import { FetchContext } from "context/FetchContext";
import { FetchFilterContext, pageSort } from "context/FetchFilter";

import { OrganizationListEdit } from "./OrganizationListEdit/OrganizationListEdit";
import { SubRowAsync } from "./SubRow/SubRowAsync";

export const OrganizationListDisplay = React.memo(() => {
  const { state, dispatch } = useContext(FetchFilterContext);
  const { data, setData, error, isLoading, retrieveData } =
    useContext(FetchContext);

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

  const handleTableUpdate = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        accessor: "subRow",
        width: 30,
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "⬇️" : "➡️"}
          </span>
        ),
      },
      {
        Header: "NAME",
        accessor: "name",
        sortDirection: state.accessor === "name" ? state.direction : "none",
        Cell: ({ row: { original } }) => {
          return (
            <Link to={`${original.organization_id}`}>{original.name}</Link>
          );
        },
      },
      {
        Header: "RANKING",
        accessor: "ranking",
        sortDirection: state.accessor === "ranking" ? state.direction : "none",
      },
      {
        Header: "TYPE",
        accessor: "organization_internal_overview.company_type",
        sortDirection:
          state.accessor === "organization_internal_overview.company_type"
            ? state.direction
            : "none",
      },
      {
        Header: "INDUSTRY",
        accessor: "industry",
        sortDirection: state.accessor === "industry" ? state.direction : "none",
      },
      {
        Header: "VERTICAL",
        accessor: "vertical",
        sortDirection: state.accessor === "vertical" ? state.direction : "none",
      },
      {
        Header: "SOLUTION TYPE",
        accessor: "solution_type",
        sortDirection: state.accessor === "solution_type" ? state.direction : "none",
      },
      {
        Header: () => null,
        id: "editList",
        width: 35,
        Cell: ({ row, updateMyData }) => {
          const { index } = row;
          let original = row.original;

          const handleUpdate = (data) => {
            Object.keys(data).map((key) => {
              return updateMyData(index, key, data[key]);
            });
          };

          return (
            <OrganizationListEdit
              id={original.organization_id}
              data={original}
              onUpdate={handleUpdate}
            />
          );
        },
      },
    ],
    [state.accessor, state.direction]
  );

  const renderRowSubComponent = React.useCallback(({ row }) => {
    return <SubRowAsync row={row} />;
  }, []);

  if (error) return <ErrorHandler onRetry={retrieveData} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <SimpleTable
        columns={columns}
        data={data}
        properties={{ height: 600 }}
        onHeaderClick={columnHeaderClick}
        updateMyData={handleTableUpdate}
        isLoading={isLoading}
        renderRowSubComponent={renderRowSubComponent}
      />
    </>
  );
});
