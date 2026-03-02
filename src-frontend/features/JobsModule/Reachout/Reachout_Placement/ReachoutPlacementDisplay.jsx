/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { Input } from "reactstrap";

import { AnimatedSmartTable } from "components";
import { ContactInformation } from "common";
import { SelectColumnFilter } from "components/UI/Table/Addons";
import { PlacementOffer } from "./PlacementOffer";

import { MoveStages } from "../common/MoveStages/MoveStages";
import { toast } from "react-toastify";

const placementOptions = [
  { value: "Pending Offer", label: "Pending Offer" },
  {
    value: "Offer Sent - Waiting Candidate Feedback",
    label: "Offer Sent - Waiting Candidate Feedback",
  },
  {
    value: "Offer Received - Candidate Rejected",
    label: "Offer Received - Candidate Rejected",
  },
  {
    value: "Offer Accepted",
    label: "Offer Accepted",
  },
];

export const ReachoutPlacementDisplay = ({
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
              `/jobs/reachout/update-placement-status/${reachout_id}`,
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
              id={`placementStatus ${row.id}`}
              type="select"
              value={status}
              onChange={(e) => {
                handleOnChange(e.target.value);
              }}
            >
              {placementOptions.map((option, i) => (
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
        id: "view offer details",
        style: {
          width: "5rem",
        },
        disableFilters: true,
        Cell: ({ row }) => {
          const original = row.original;
          return (
            <>
              <PlacementOffer reachout_id={original.reachout_id} />
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
