import React from "react";

import { Button } from "reactstrap";

import { useCustomForm, useAxiosPrivate, useLoading } from "hooks";
import { toast } from "react-toastify";

export const ListItemAdd = ({ url, onRefetch }) => {
  const authAxios = useAxiosPrivate();
  const { formData, reset } = useCustomForm({
    item: "",
  });

  const fetchSubmit = async () => {
    try {
      const response = authAxios.post(url, {
        ...formData,
      });
      toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });

      reset();
      onRefetch();
    } catch (error) {}
  };

  const [onSubmit, isLoading] = useLoading(fetchSubmit);

  return (
    <>
      <Button disabled={isLoading} color="primary" onClick={onSubmit}>
        {isLoading ? (
          "Adding..."
        ) : (
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        )}
      </Button>
    </>
  );
};
