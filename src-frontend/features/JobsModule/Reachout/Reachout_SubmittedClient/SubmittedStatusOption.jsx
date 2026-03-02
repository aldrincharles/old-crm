import React from "react";
import { Input } from "reactstrap";

import { useToggle, useAxiosPrivate } from "hooks";
import { SubmissionDetails } from "./SubmissionDetails";
import { toast } from "react-toastify";

const submit_options = [
  { value: "Pending", label: "Pending" },
  {
    value: "Submitted - Waiting for Feedback",
    label: "Submitted - Waiting for Feedback",
  },
  {
    value: "Submitted - Client Rejected",
    label: "Submitted - Client Rejected",
  },
  {
    value: "Submitted - Candidate Rejected",
    label: "Submitted - Candidate Rejected",
  },
  //Will open modal when selected
  { value: "Submitted - For Interview", label: "Submitted - For Interview" },
];

export const SubmittedStatusOption = ({ row, onUpdateValues = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const { submit_status, reachout_id } = row.original;
  const [visible, toggle] = useToggle();

  const handleSelect = async (e) => {
    if (e === "Submitted - For Interview") {
      toggle();
      return;
    }

    let response = authAxios.post(
      `/jobs/reachout/edit-submitted-status/${reachout_id}`,
      {
        status: e,
      }
    );
    try {
      response = await toast.promise(response, {
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
      const result = response.data;
      onUpdateValues({
        ...result.content,
      });
    } finally {
    }
  };

  return (
    <div>
      <Input
        id={`submit_status ${row.id}`}
        name="status"
        type="select"
        value={submit_status}
        onChange={(e) => {
          handleSelect(e.target.value);
        }}
      >
        {submit_options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </Input>

      <SubmissionDetails
        visible={visible}
        toggle={toggle}
        reachout_id={reachout_id}
        onUpdateValues={onUpdateValues}
      />
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </div>
  );
};
