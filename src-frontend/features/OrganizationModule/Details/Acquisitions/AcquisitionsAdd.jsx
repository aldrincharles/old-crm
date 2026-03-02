import React, { useState } from "react";

import { Form, Button } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { AcquisitionsForm } from "./AcquisitionsForm";
import { toast } from "react-toastify";

export const AcquisitionsAdd = ({ url, onRefetch }) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    {
      company_name: "",
      amount: "",
      date_acquired: new Date(),
    },
    (e) => onSubmit(e)
  );
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    setIsLoading(true);
    const response = authAxios.post(url, {
      ...values,
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
        <BootstrapModal.Header>ADD ACQUISITIONS</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="AcquisitionsAddForm" onSubmit={handleSubmit}>
            <AcquisitionsForm
              formData={formData}
              handleOnChange={handleOnChange}
            />
          </Form>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={isLoading}
            color="success"
            type="submit"
            form="AcquisitionsAddForm"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
