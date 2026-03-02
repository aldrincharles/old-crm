/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { AnimatedSmartTable } from "components";
import { ContactInformation } from "common";
import { SelectColumnFilter } from "components/UI/Table/Addons";
import { gradingColor } from "constants";
import { JDSend } from "./JDSend";

import { MoveStages } from "../common/MoveStages/MoveStages";

export const ReachoutResponsesDisplay = ({
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
        Header: "RESPONSE DATE",
        accessor: "response_date",
        disableFilters: true,
      },
      {
        Header: "REPLY",
        accessor: "reply",
        disableFilters: true,
        style: {
          width: "20rem",
        },
      },
      {
        Header: "TYPE",
        accessor: "response_type",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "JD SEND",
        accessor: "jd_send",
        Filter: SelectColumnFilter,
        filter: "equals",

        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          const handleOnChange = (data) => {
            updateMyData(index, id, data);
          };

          return <JDSend row={row} onUpdateValues={handleOnChange} />;
        },
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
