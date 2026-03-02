import React from "react";
import { Input } from "reactstrap";

import { useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

const jd_status = [
  { value: "Pending", label: "Pending" },
  {
    value: "JD Sent - Waiting for Response",
    label: "JD Sent - Waiting for Response",
  },
  { value: "JD Sent - Interested", label: "JD Sent - Interested" },
  { value: "JD Sent - Not Interested", label: "JD Sent - Not Interested" },
];

export const JDSend = ({ row, onUpdateValues = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const { jd_send, response_id } = row.original;

  const handleUpdate = async (e) => {
    const response = authAxios.post(
      `/jobs/reachout/update-jd-send/${response_id}`,
      {
        status: e,
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
      onUpdateValues(e);
    } finally {
    }
  };

  return (
    <>
      <Input
        id={`status ${response_id}`}
        name="status"
        type="select"
        value={jd_send}
        onChange={(e) => {
          handleUpdate(e.target.value);
        }}
      >
        {jd_status.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </Input>
    </>
  );
};
