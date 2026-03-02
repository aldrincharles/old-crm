/* eslint-disable react/display-name */
import React from "react";

import { Input } from "reactstrap";

import { useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

const options = [
  { value: "ITEL Sourcing", label: "ITEL Sourcing" },
  {
    value: "Recommendation",
    label: "Recommendation",
  },
  { value: "LinkedIn Advertisement", label: "LinkedIn Advertisement" },
  { value: "Website/ATS", label: "Website/ATS" },
  { value: "Partner HCM", label: "Partner HCM" },
];

export const SourceSelect = ({
  id,
  source,
  url,
  onUpdateValues = () => {},
}) => {
  const authAxios = useAxiosPrivate();

  const handleUpdate = async (event) => {
    const response = authAxios.post(url, {
      source: event,
    });

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
      onUpdateValues(event);
    } finally {
    }
  };

  return (
    <>
      <Input
        id={`${id} source`}
        name="source"
        type="select"
        value={source || ""}
        onChange={(e) => {
          handleUpdate(e.target.value);
        }}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </Input>
    </>
  );
};
