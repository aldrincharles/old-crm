/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { AnimatedSmartTable } from "components";
import { ContactInformation } from "common";
import { SelectColumnFilter } from "components/UI/Table/Addons";
import { gradingColor } from "constants";
import { SubmittedStatusOption } from "./SubmittedStatusOption";
import { EditDateSubmitted } from "./EditDateSubmitted";

import { MoveStages } from "../common/MoveStages/MoveStages";

export const ReachoutSubmittedClientDisplay = ({
  data,
  handleUpdate = () => null,
  onSelectRows = () => null,
  onSelectedDelete = () => null,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: "moveStages",
        width: 35,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <>
              <MoveStages row={row} />
            </>
          );
        },
      },
      {
        Header: "STRATEGY",
        accessor: "strategy",
        disableFilters: true,
      },
      {
        Header: "GRADE",
        accessor: "grading",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: ({ row }) => {
          const { grading } = row.original;
          return (
            <span className={`badge ${gradingColor[grading][0]}`}>
              {gradingColor[grading][1]}
            </span>
          );
        },
      },
      {
        Header: "NAME",
        accessor: "name",
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
                shortcut_linked_in={original.linkedin}
              />
            </>
          );
        },
      },
      {
        Header: "DATE SUBMITTED",
        id: "date_submitted",
        disableFilters: true,
        Cell: ({ row, updateMyData }) => {
          const { index } = row;

          const handleUpdate = (data) => {
            Object.keys(data).map((key) => {
              updateMyData(index, key, data[key]);
            });
          };

          return (
            <>
              <EditDateSubmitted row={row} onUpdateValues={handleUpdate} />
            </>
          );
        },
      },
      {
        Header: "SUBMIT STATUS",
        accessor: "submit_status",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: ({ row, updateMyData }) => {
          const { index } = row;

          const handleUpdateValues = (data) => {
            Object.keys(data).map((key) => {
              updateMyData(index, key, data[key]);
            });
          };

          return (
            <>
              <SubmittedStatusOption
                row={row}
                onUpdateValues={handleUpdateValues}
              />
            </>
          );
        },
      },
      {
        Header: "PLATFORM",
        accessor: "platform",
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: "COMMENTS",
        accessor: "comments",
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    []
  );

  return (
    <>
      <AnimatedSmartTable
        columns={columns}
        data={data}
        updateMyData={handleUpdate}
        onSelectRows={onSelectRows}
        onSelectedDelete={onSelectedDelete}
        paginated
        selectable
      />
    </>
  );
};
