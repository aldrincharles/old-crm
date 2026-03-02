/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { AnimatedSmartTable } from "components";
import { ContactInformation } from "common";
import { SelectColumnFilter } from "components/UI/Table/Addons";
import { gradingColor } from "constants";
import { SendOutFollowUp } from "./SendOutFollowUp";

import { MoveStages } from "../common/MoveStages/MoveStages";

export const ReachoutSendoutDisplay = ({
  data,
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
        Header: "DATE REACH OUT",
        accessor: "date_reach_out",
        disableFilters: true,
      },
      {
        Header: "ORGANIZATION",
        accessor: "organization",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "POSITION",
        accessor: "position",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "LOCATION",
        accessor: "location",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "CHANNEL",
        accessor: "channel",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "SEND OUT CHANNEL",
        accessor: "send_out_channel",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "STATUS",
        accessor: "status",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: () => null,
        id: "followUp",
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <>
              <SendOutFollowUp row={row} />
            </>
          );
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
        onSelectRows={onSelectRows}
        onSelectedDelete={onSelectedDelete}
        paginated
        selectable
      />
    </>
  );
};
