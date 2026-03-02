import React, { useState } from "react";

import { Form, Label, Button, Input } from "reactstrap";
import { toast } from "react-toastify";

import { BootstrapModal, IconButton } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";

export const ResetMyPassword = ({ url = "" }) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const [isLoading, setIsLoading] = useState(false);
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    { newPassword: "" },
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = authAxios.put(`${url}`, {
      new_password: data.newPassword,
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <IconButton className="icon-button icon ion-key p-1" onClick={toggle} />
      <BootstrapModal size="sm" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>CHANGE PASSWORD</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="ChangePassword" onSubmit={handleSubmit}>
            <Label>New Password:</Label>
            <Input
              type="password"
              value={formData.newPassword}
              min={5}
              onChange={(e) => handleOnChange("newPassword", e.target.value)}
              required
            />
          </Form>
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={isLoading}
            color="success"
            type="submit"
            form="ChangePassword"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
