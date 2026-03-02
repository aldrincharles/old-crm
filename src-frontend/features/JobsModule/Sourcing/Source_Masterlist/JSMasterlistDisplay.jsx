/* eslint-disable react/display-name */
import React, { useContext, useMemo } from "react";

import { useParams } from "react-router-dom";

import { FetchContext } from "context/FetchContext";
import { FetchFilterContext, pageSort } from "context/FetchFilter";
import { BarLoaderSpinner, ErrorHandler, SimpleTable } from "components";
import { ContactInformation, GradingModal } from "common";
import { gradingColor } from "constants";
import { FeedbackModal } from "./FeedbackModal";
import { MasterListPreferences } from "./MasterListPreferences";
import { EditStrategy } from "../common/EditStrategy";

export const JSMasterlistDisplay = () => {
  const { id } = useParams();
  let job_id = id;
  const { data, setData, isLoading, error, retrieveData } =
    useContext(FetchContext);
  const { state, dispatch } = useContext(FetchFilterContext);

  const handleUpdate = (rowIndex, columnId, value) => {
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

  const column = useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "name",
        sticky: "left",
        width: 250,
        sortType: "basic",
        sortDirection: state.accessor === "name" ? state.direction : "none",
      },
      {
        Header: () => null,
        id: "contactInformation",
        sticky: "left",
        width: 75,
        Cell: ({ row: { original } }) => {
          return (
            <>
              <ContactInformation
                modal_contact_id={original.contact_id}
                shortcut_linked_in={original.linkedin}
              />
            </>
          );
        },
      },
      {
        Header: "GENERAL GRADE",
        accessor: "general_grade",
        sortType: "basic",
        sortDirection:
          state.accessor === "general_grade" ? state.direction : "none",
        sticky: "left",
        Cell: ({ row }) => {
          const { general_grade } = row.original;
          return (
            <span className={`badge ${gradingColor[general_grade][0]}`}>
              {gradingColor[general_grade][1]}
            </span>
          );
        },
      },
      {
        Header: "JOB GRADING",
        accessor: "grading",
        // disableSortBy: true,
        sortType: "basic",
        sortDirection: state.accessor === "grading" ? state.direction : "none",
        sticky: "left",
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          const { grading, contact_id } = row.original;

          const handleUpdate = (data) => {
            updateMyData(index, id, data);
          };

          return (
            <GradingModal
              grading={grading}
              onUpdateValues={handleUpdate}
              url={`/jobs/change-masterlist-job-grade/${job_id}/${contact_id}`}
            />
          );
        },
      },
      {
        Header: "STRATEGY",
        accessor: "strategy",
        disableSortBy: true,
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          let original = row.original;

          const handleUpdate = (data) => {
            updateMyData(index, id, data);
          };

          return (
            <EditStrategy
              strategy={original.strategy ? original.strategy : "-"}
              onUpdateValues={handleUpdate}
              id={{ contact_id: original.contact_id, job_id: id }}
            />
          );
        },
      },
      {
        Header: "Organization",
        accessor: "organization",
        sortDirection:
          state.accessor === "organization" ? state.direction : "none",
      },
      {
        Header: "SALARY",
        accessor: "salary",
        disableSortBy: true,
      },
      {
        Header: "CITIZENSHIP",
        accessor: "citizenship",
        disableSortBy: true,
      },
      {
        Header: "GENERAL COMMENT",
        accessor: "general_comment",
        disableSortBy: true,
      },
      {
        Header: "CV",
        id: "cv",
        Cell: ({ row }) => {
          const { cv } = row.original;
          return (
            <>
              <FeedbackModal row={row} infoData={cv} />
            </>
          );
        },
      },
      {
        Header: "IV NOTES",
        id: "iv_notes",
        Cell: ({ row }) => {
          const { iv_notes } = row.original;
          return (
            <>
              <FeedbackModal row={row} infoData={iv_notes} />
            </>
          );
        },
      },
      {
        Header: "LOOKING FOR OPPORTUNITY",
        id: "looking_for",
        disableFilters: true,
        Cell: ({ row: { original } }) => {
          return <MasterListPreferences data={original} />;
        },
      },
    ],

    [job_id, state.accessor, state.direction]
  );

  if (error) return <ErrorHandler onRetry={retrieveData} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <SimpleTable
        data={data}
        columns={column}
        properties={{ height: 400 }}
        onHeaderClick={columnHeaderClick}
        updateMyData={handleUpdate}
      />
    </>
  );
};
