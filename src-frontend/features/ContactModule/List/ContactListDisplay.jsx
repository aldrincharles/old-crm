/* eslint-disable react/display-name */
import React, { useContext, useMemo } from "react";

import { Link } from "react-router-dom";

import { ContactInformation } from "common";
import { BarLoaderSpinner, ErrorHandler, SimpleTable } from "components";
import { FetchContext } from "context/FetchContext";
import { FetchFilterContext, pageSort } from "context/FetchFilter";
import { candidateCategory } from "constants";

import { DropDown } from "components/UI/Table/TableFetch";

export const ContactListDisplay = () => {
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
        Header: "NAME",
        accessor: "contact_name",
        sortDirection:
          state.accessor === "contact_name" ? state.direction : "none",
        Cell: ({ row: { original } }) => {
          return (
            <Link to={`/contacts/details/${original.id}`}>
              {original.contact_name}
            </Link>
          );
        },
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
                modal_contact_id={original.id}
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
          state.accessor === "organization.name" ? state.direction : "none",
      },
      {
        Header: "POSITION",
        accessor: "contact_position",
        sortDirection:
          state.accessor === "contact_position" ? state.direction : "none",
      },
      {
        Header: "LOCATION",
        accessor: "contact_location",
        sortDirection:
          state.accessor === "contact_location" ? state.direction : "none",
      },
      {
        Header: "GEOGRAPHY",
        accessor: "contact_geography",
        sortDirection:
          state.accessor === "contact_geography" ? state.direction : "none",
      },
      {
        Header: "Category",
        accessor: "candidate_category",
        sortDirection:
          state.accessor === "candidate_category" ? state.direction : "none",
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          let original = row.original;

          const handleUpdate = (data) => {
            updateMyData(index, id, data);
          };

          return (
            <DropDown
              data={original?.candidate_category || ""}
              url={`/contact/${original.id}/candidate-category`}
              onUpdateValues={handleUpdate}
              options={candidateCategory}
            />
          );
        },
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
        properties={{ height: "70vh" }}
        onHeaderClick={columnHeaderClick}
        updateMyData={handleTableUpdate}
        isLoading={isLoading}
      />
    </>
  );
};
