import React, { useState } from "react";

import { Form, Button } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { RevenueForm } from "./RevenueForm";
import { toast } from "react-toastify";

export const RevenueAdd = ({ url, onRefetch }) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    {
      year: "",
      amount: "",
      percentage_growth: "",
    },
    (e) => onSubmit(e)
  );
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = authAxios.post(url, {
      revenu_id: data?.revenue_id,
      ...formData,
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
      reset();
      onRefetch();
      toggle();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </Button>
      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>ADD REVENUE</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="RevenueAddForm" onSubmit={handleSubmit}>
            <RevenueForm formData={formData} handleOnChange={handleOnChange} />
          </Form>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={isLoading}
            color="success"
            type="submit"
            form="RevenueAddForm"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
