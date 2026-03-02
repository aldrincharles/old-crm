import React, { useState } from "react";

import { Form, Label, Button, Input } from "reactstrap";
import { toast } from "react-toastify";

import { BootstrapModal, SelectWrap, IconButton } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { role as optionRole } from "constants";

export const EditInternalUsers = ({
  data: { user_id, firstName, lastName, role },
  setData = () => {},
}) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const [isLoading, setIsLoading] = useState(false);
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    {
      firstName: firstName,
      lastName: lastName,
      role: role,
    },
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = authAxios.put(`/users/${user_id}`, {
      first_name: data.firstName,
      last_name: data.lastName,
      role: data.role,
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
      <IconButton
        className="icon-button icon ion-gear-b p-1"
        onClick={toggle}
      />
      <BootstrapModal size="xl" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>EDIT USER</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="EditInternalUsers" onSubmit={handleSubmit}>
            <Label>First Name</Label>
            <Input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleOnChange("firstName", e.target.value)}
              required
            />
            <Label>Last Name</Label>
            <Input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleOnChange("lastName", e.target.value)}
              required
            />
            <Label>Role:</Label>
            <SelectWrap
              name="role"
              value={formData.role}
              defaultValue={formData.role}
              options={optionRole}
              onChange={(e) => handleOnChange("role", e)}
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
            form="EditInternalUsers"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
