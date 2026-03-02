/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { ContactInformation, GradingModal } from "common";
import { AnimatedSmartTable } from "components";
import {
  SelectColumnFilter,
  NumberRangeColumnFilter,
} from "components/UI/Table/Addons";

import { EditStrategy } from "../common/EditStrategy";
import { SourcingComment } from "../common/SourcingComment";

export const JobsSourceExportDisplay = ({
  data,
  handleUpdate = () => null,
  onSelectRows = () => null,
  onSelectedDelete = () => null,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "name",
        sticky: "left",
        width: 250,
      },

      {
        Header: () => null,
        id: "contactInformation",
        sticky: "left",
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
        Header: () => null,
        id: "sourcingComment",
        disableFilters: true,
        sticky: "left",
        width: 35,
        Cell: ({ row, updateMyData }) => {
          const { index } = row;

          const handleUpdate = (data) => {
            Object.keys(data).map((key) => {
              updateMyData(index, key, data[key]);
            });
          };

          return <SourcingComment row={row} onUpdateValues={handleUpdate} />;
        },
      },

      {
        Header: "STRATEGY",
        accessor: "strategy",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          let original = row.original;

          const handleUpdate = (data) => {
            updateMyData(index, id, data);
          };

          return (
            <EditStrategy
              strategy={original.strategy}
              onUpdateValues={handleUpdate}
              id={{
                contact_id: original.contact_id,
                job_id: original.job_id,
              }}
            />
          );
        },
      },
      {
        Header: "GRADE",
        accessor: "grading",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          let original = row.original;

          const handleUpdate = (data) => {
            updateMyData(index, id, data);
          };
          return (
            <GradingModal
              grading={original.grading}
              onUpdateValues={handleUpdate}
              url={`/change-grading/${original.job_id}/${original.contact_id}`}
            />
          );
        },
      },
      {
        Header: "ORGANIZATION",
        accessor: "organization",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "ROLE START DATE (MOS)",
        accessor: "role_start",
        width: 250,
        Filter: NumberRangeColumnFilter,
        filter: "between",
      },
      {
        Header: "POSITION",
        accessor: "position",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "INDUSTRY",
        accessor: "industry",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "VERTICAL",
        accessor: "vertical",
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
        Header: "NATIONALITY",
        accessor: "nationality",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "ID STATUS",
        accessor: "id_status",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "CATEGORY",
        accessor: "candidate_category.value",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
    ],
    []
  );

  return (
    <>
      <AnimatedSmartTable
        data={data}
        columns={columns}
        updateMyData={handleUpdate}
        onSelectRows={onSelectRows}
        onSelectedDelete={onSelectedDelete}
        paginated
        selectable
        overflow
      />
    </>
  );
};
