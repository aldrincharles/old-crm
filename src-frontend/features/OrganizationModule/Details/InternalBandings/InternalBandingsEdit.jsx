import React, { useState } from "react";

import { Form, Button } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { InternalBandingsForm } from "./InternalBandingsForm";
import { toast } from "react-toastify";

export const InternalBandingsEdit = ({
  data,
  url,
  onRefetch = () => {},
  onProcessKeys = () => {},
}) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();

  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    {
      title: data?.title,
      position: data?.position,
      comments: data?.comments,
    },
    (e) => onSubmit(e)
  );
  const [isLoading, setIsLoading] = useState({
    edit: false,
    delete: false,
  });

  const onSubmit = async () => {
    setIsLoading({ ...isLoading, edit: true });
    let response = authAxios.put(url, {
      banding_id: data?.banding_id,
      ...formData,
    });

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
      onProcessKeys(result.content);
      toggle();
    } finally {
      setIsLoading({ ...isLoading, edit: false });
    }
  };

  const onDelete = async () => {
    setIsLoading({ ...isLoading, delete: true });
    const response = authAxios.delete(url, {
      data: { banding_id: data?.banding_id },
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
        <BootstrapModal.Header>EDIT INTERNAL BANDINGS</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="InternalBandingsEditForm" onSubmit={handleSubmit}>
            <InternalBandingsForm
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
            form="InternalBandingsEditForm"
          >
            {isLoading.edit ? "Saving..." : "Save"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
