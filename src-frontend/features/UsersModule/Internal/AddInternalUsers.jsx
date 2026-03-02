import React, { useState } from "react";

import { Form, Label, Button, Input } from "reactstrap";

import { BootstrapModal, SelectWrap } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { role as optionRole } from "constants";
import { toast } from "react-toastify";

export const AddInternalUsers = ({ onRefetch = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const [isLoading, setIsLoading] = useState(false);
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    {
      firstName: "",
      lastName: "",
      role: {},
      e_mail: "",
      password: "",
    },
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = authAxios.post(`/users`, {
      first_name: data.firstName,
      last_name: data.lastName,
      role: data.role,
      email_address: data.e_mail,
      password: data.password,
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
        Add Users
      </Button>
      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>ADD USER</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="AddInternalUsers" onSubmit={handleSubmit}>
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
            <Label>E-mail:</Label>
            <Input
              type="email"
              value={formData.e_mail}
              onChange={(e) => handleOnChange("e_mail", e.target.value)}
              required
            />
            <Label>Password:</Label>
            <Input
              type="password"
              value={formData.password}
              min={5}
              onChange={(e) => handleOnChange("password", e.target.value)}
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
            form="AddInternalUsers"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
