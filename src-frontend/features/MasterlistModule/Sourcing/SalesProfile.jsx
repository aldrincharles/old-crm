import React from "react";

import { Input } from "reactstrap";

import { salesProfileOptions } from "constants";
import { useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

export const SalesProfile = ({ row, onUpdateValues = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const { sales_profile, id } = row.original.contact;

  const handleUpdate = async (e) => {
    const response = authAxios.put(`/masterlist/${id}/sales-profile`, {
      sales_profile: e,
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
      onUpdateValues(e);
    } finally {
    }
  };

  return (
    <Input
      id={`status ${id}`}
      name="status"
      type="select"
      value={sales_profile}
      onChange={(e) => {
        handleUpdate(e.target.value);
      }}
    >
      {salesProfileOptions.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </Input>
  );
};
