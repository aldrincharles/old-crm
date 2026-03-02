/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { Input } from "reactstrap";

import { AnimatedSmartTable } from "components";
import { ContactInformation, InterviewDetails } from "common";
import { SelectColumnFilter } from "components/UI/Table/Addons";
import { gradingColor } from "constants";

import { MoveStages } from "../common/MoveStages/MoveStages";
import { toast } from "react-toastify";

const statusOption = [
  { value: "Scheduling", label: "Scheduling" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Done - Client Rejected", label: "Done - Client Rejected" },
  { value: "Done - Candidate Rejected", label: "Done - Candidate Rejected" },
  { value: "Done - Next Stage", label: "Done - Next Stage" },
  {
    value: "Done - Waiting For Feedback",
    label: "Done - Waiting For Feedback",
  },
  { value: "For Offer", label: "For Offer" },
];

export const ReachoutClientInterviewDisplay = ({
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
        Header: "INTERVIEW STATUS",
        accessor: "interview_status",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          const { reachout_id, interview_status } = row.original;

          const handleOnChange = async (data) => {
            const response = authAxios.post(
              `/jobs/reachout/update-client-interview-status/${reachout_id}`,
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
                  render({ data }) {
                    const message = data.data?.message;
                    return `${message} 👌`;
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
              id={`interview_status ${row.id}`}
              type="select"
              value={interview_status}
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
            >
              {statusOption.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Input>
          );
        },
      },
      {
        Header: "INTERVIEW STAGE",
        accessor: "interview_stage",
        Filter: SelectColumnFilter,
        filter: "equals",
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          const { reachout_id, interview_stage, stages_option } = row.original;

          const handleOnChange = async (data) => {
            const response = authAxios.post(
              `/jobs/reachout/update-client-interview-stage/${reachout_id}`,
              {
                stage: data,
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
                  render({ data }) {
                    const message = data.data?.message;
                    return `${message} 👌`;
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
              id={`interview_stage ${row.id}`}
              type="select"
              value={interview_stage}
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
            >
              {stages_option.map((option, i) => (
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
                url={`/jobs/reachout/update-client-interview/${row.original.client_interview_id}`}
                condition="Client Interview"
                row={row}
                onUpdateValues={handleUpdateValues}
              />
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
        updateMyData={handleUpdate}
        onSelectRows={onSelectRows}
        onSelectedDelete={onSelectedDelete}
        paginated
        selectable
      />
    </>
  );
};
