import React, { useState, useEffect } from "react";

import { Form, Label, Button, Input, FormGroup, Table } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle, useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

export const EditClientUser = ({
  data: { client_id, organization, firstName, lastName, jobs },
  setData = () => {},
  onRefetch = () => {},
}) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const [isLoading, setIsLoading] = useState({
    edit: false,
    delete: false,
  });
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
  });

  const [dynamicInput, setDynamicInput] = useState(jobs);

  useEffect(() => {
    setDynamicInput(jobs);
  }, [jobs]);

  useEffect(() => {
    setFormData({
      firstName: firstName,
      lastName: lastName,
    });
  }, [firstName, lastName]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading({ ...isLoading, edit: true });
    const response = authAxios.put(`/external-users/${client_id}`, {
      first_name: formData.firstName,
      last_name: formData.lastName,
      jobs: dynamicInput,
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
      const result = response.data;
      setData(result.content);
      toggle();
    } finally {
      setIsLoading({ ...isLoading, edit: false });
    }
  };

  const onDelete = async () => {
    setIsLoading({ ...isLoading, delete: true });
    const response = authAxios.delete(`/external-users/${client_id}`);

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

  const handleCheckbox = (index, e) => {
    const values = [...dynamicInput];
    values[index]["check_value"] = e;
    setDynamicInput(values);
  };

  const handleOnChange = (name, event) => {
    setFormData({
      ...formData,
      [name]: event ? event : "",
    });
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Settings
      </Button>
      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>EDIT CLIENT</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="EditClientUser" onSubmit={handleOnSubmit}>
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
            <h3>{organization}</h3>
            <Table className="mt-5">
              <thead>
                <tr>
                  <th></th>
                  <th>Search</th>
                  <th>Date Activated</th>
                </tr>
              </thead>
              <tbody>
                {dynamicInput.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <Input
                        id="checkbox2"
                        type="checkbox"
                        checked={data.check_value}
                        onChange={(e) => {
                          handleCheckbox(index, e.target.checked);
                        }}
                      />
                    </td>
                    <td>{data.search}</td>
                    <td>{data.date_activated}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>

          {/* <pre>
          {JSON.stringify({ formData: formData, table: dynamicInput }, null, 2)}
        </pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button disabled={isLoading.delete} color="danger" onClick={onDelete}>
            {isLoading.edit ? "Deleting..." : "Delete"}
          </Button>
          <Button
            disabled={isLoading.edit}
            color="success"
            type="submit"
            form="EditClientUser"
          >
            {isLoading.edit ? "Saving..." : "Save"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
