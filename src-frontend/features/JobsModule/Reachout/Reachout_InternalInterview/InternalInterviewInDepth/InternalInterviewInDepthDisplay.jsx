/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { Input } from "reactstrap";

import { AnimatedSmartTable } from "components";
import { ContactInformation, InterviewDetails } from "common";
import { SelectColumnFilter } from "components/UI/Table/Addons";
import { gradingColor } from "constants";

import { MoveStages } from "../../common/MoveStages/MoveStages";
import { toast } from "react-toastify";

const interviewOption = [
  { value: "Scheduling", label: "Scheduling" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Done - iTel Rejected", label: "Done - iTel Rejected" },
  { value: "Done - Candidate Rejected", label: "Done - Candidate Rejected" },
  { value: "Done - Submit to Client", label: "Done - Submit to Client" },
  { value: "Done - Pending to Forward", label: "Done - Pending to Forward" },
];

const packOption = [
  { value: "Pending", label: "Pending" },
  { value: "Sent", label: "Sent" },
  { value: "No", label: "No" },
];

export const InternalInterviewInDepthDisplay = ({
  data,
  handleUpdate = () => null,
  onSelectRows = () => null,
  onSelectedDelete = () => null,
  authAxios,
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
        Header: "STATUS",
        accessor: "status",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          const { reachout_id, status } = row.original;

          const handleOnChange = async (data) => {
            const response = authAxios.post(
              `/jobs/reachout/update-interview-status/in-depth/${reachout_id}`,
              {
                status: data,
              }
            );
            try {
              await toast.promise(response, {
                pending: {
                  render() {
                    return "Pending";
                  },
                },
                success: {
                  render() {
                    return "Promise resolved 👌";
                  },
                },
                error: {
                  render() {
                    return "Oops! Something went wrong 🤯";
                  },
                },
              });
              updateMyData(index, id, data);
            } finally {
            }
          };

          return (
            <Input
              id={`status ${row.id}`}
              type="select"
              value={status}
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
            >
              {interviewOption.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Input>
          );
        },
      },
      {
        Header: () => null,
        id: "interviewDetails",
        style: {
          width: "5rem",
        },
        disableFilters: true,
        Cell: ({ row, updateMyData }) => {
          const { index } = row;

          const handleUpdateValues = (data) => {
            // eslint-disable-next-line array-callback-return
            Object.keys(data).map((key) => {
              updateMyData(index, key, data[key]);
            });
          };

          return (
            <>
              <InterviewDetails
                url={`/jobs/reachout/update-internal-interview/in-depth/${row.original.reachout_id}`}
                condition="Internal Interview"
                row={row}
                onUpdateValues={handleUpdateValues}
              />
            </>
          );
        },
      },
      {
        Header: "INFO PACK",
        accessor: "info_pack",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          const { reachout_id, info_pack } = row.original;

          const handleOnChange = async (data) => {
            const response = authAxios.post(
              `/jobs/reachout/update-info-pack/in-depth/${reachout_id}`,
              {
                info_pack: data,
              }
            );

            try {
              await toast.promise(response, {
                pending: {
                  render() {
                    return "Pending";
                  },
                },
                success: {
                  render() {
                    return "Promise resolved 👌";
                  },
                },
                error: {
                  render() {
                    return "Oops! Something went wrong 🤯";
                  },
                },
              });
              updateMyData(index, id, data);
            } finally {
            }
          };

          return (
            <Input
              id={`info_pack ${row.id}`}
              type="select"
              value={info_pack}
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
            >
              {packOption.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Input>
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
        updateMyData={handleUpdate}
        onSelectRows={onSelectRows}
        onSelectedDelete={onSelectedDelete}
        paginated
        selectable
      />
    </>
  );
};
