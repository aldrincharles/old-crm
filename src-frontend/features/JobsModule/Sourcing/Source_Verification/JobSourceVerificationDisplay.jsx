/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { ContactInformation, GradingModal } from "common";
import { AnimatedSmartTable } from "components";
import {
  SelectColumnFilter,
  NumberRangeColumnFilter,
} from "components/UI/Table/Addons";
import { gradingColor } from "constants";
import { SourceSelect } from "./SourceSelect";

import { EditStrategy } from "../common/EditStrategy";
import { SourcingComment } from "../common/SourcingComment";

export const JobSourceVerificationDisplay = ({
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
        minWidth: 75,
        width: 75,
        maxWidth: 75,
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
        minWidth: 35,
        width: 35,
        maxWidth: 35,
        Cell: ({ row, updateMyData }) => {
          const { index } = row;

          const handleUpdate = (data) => {
            // eslint-disable-next-line array-callback-return
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
              id={{ contact_id: original.contact_id, job_id: original.job_id }}
            />
          );
        },
      },
      {
        Header: "SOURCE",
        accessor: "source",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          let original = row.original;

          const handleUpdate = (data) => {
            updateMyData(index, id, data);
          };

          return (
            <SourceSelect
              id={row.id}
              source={original.source}
              onUpdateValues={handleUpdate}
              url={`/jobs/sourcing/change-source/${original.job_id}/${original.contact_id}`}
            />
          );
        },
      },
      {
        Header: "GRADE",
        accessor: "grading",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: ({ row }) => {
          let original = row.original;
          return (
            <span className={`badge ${gradingColor[original.grading][0]}`}>
              {gradingColor[original.grading][1]}
            </span>
          );
        },
      },
      {
        Header: "VERIFICATION GRADE",
        accessor: "verification_grade",
        Filter: SelectColumnFilter,
        filter: "equals",
        width: 250,
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          let original = row.original;

          const handleUpdate = (data) => {
            updateMyData(index, id, data);
          };

          return (
            <GradingModal
              grading={original.verification_grade}
              onUpdateValues={handleUpdate}
              url={`/change-verification-grading/${original.job_id}/${original.contact_id}`}
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
        Header: "CANDIDATE CATEGORY",
        accessor: "candidate_category.value",
        Filter: SelectColumnFilter,
        filter: "equals",
        width: 250,
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
