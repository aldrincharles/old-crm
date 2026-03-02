import React, { useState } from "react";

import { Form, Button } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { AcquisitionsForm } from "./AcquisitionsForm";
import { toast } from "react-toastify";

export const AcquisitionsEdit = ({
  data,
  url,
  onRefetch = () => {},
  onProcessKeys = () => {},
}) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    {
      company_name: data?.company_name,
      amount: data?.amount,
      date_acquired: data?.date_acquired
        ? new Date(data?.date_acquired)
        : new Date(),
    },
    (e) => onSubmit(e)
  );

  const [isLoading, setIsLoading] = useState({
    edit: false,
    delete: false,
  });

  const onSubmit = async () => {
    setIsLoading({ ...isLoading, edit: true });
    const response = authAxios.put(url, {
      acquisition_id: data?.acquisition_id,
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
      const result = data.data.content;
      onProcessKeys(result.content);
      toggle();
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    setIsLoading({ ...isLoading, delete: true });
    const response = authAxios.delete(url, {
      data: { acquisition_id: data?.acquisition_id },
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
      toggle();
      onRefetch();
    } finally {
      setIsLoading({ ...isLoading, delete: false });
    }
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i className="ion-edit" />
      </Button>
      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>EDIT ACQUISITIONS</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="AcquisitionsEditForm" onSubmit={handleSubmit}>
            <AcquisitionsForm
              formData={formData}
              handleOnChange={handleOnChange}
            />
          </Form>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={isLoading.delete}
            color="danger"
            type="submit"
            onClick={onDelete}
          >
            {isLoading.delete ? "Deleting..." : "Delete"}
          </Button>
          <Button
            disabled={isLoading.edit}
            color="success"
            type="submit"
            form="AcquisitionsEditForm"
          >
            {isLoading.edit ? "Saving..." : "Save"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
