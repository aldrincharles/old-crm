import React, { useState } from "react";

import { Form, Label, Button, Input, FormGroup } from "reactstrap";

import { BootstrapModal, AsyncSelectWrap } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

export const AddClientUser = ({ onRefetch = () => null }) => {
  const authAxios = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, toggle] = useToggle();
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    {
      organization: {},
      firstName: "",
      lastName: "",
    },
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = authAxios.post(`/external-users`, {
      organization: data.organization,
      first_name: data.firstName,
      last_name: data.lastName,
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
      setIsLoading(true);
    }
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Add Client
      </Button>
      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>ADD NEW CLIENT</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="AddClientUser" onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Organization</Label>
              <AsyncSelectWrap
                name="organization"
                dependencies={{ url: "/parameters", topic: "organization" }}
                value={formData.organization}
                onChange={(e) => handleOnChange("organization", e)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>First Name</Label>
              <Input
                type="text"
                maxLength={25}
                value={formData.firstName}
                onChange={(e) => {
                  handleOnChange("firstName", e.target.value);
                }}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name</Label>
              <Input
                type="text"
                maxLength={25}
                value={formData.lastName}
                onChange={(e) => {
                  handleOnChange("lastName", e.target.value);
                }}
                required
              />
            </FormGroup>
          </Form>
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={isLoading}
            color="success"
            type="submit"
            form="AddClientUser"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
