import React, { useState, useEffect } from "react";

import { Button, Form } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle, useAxiosPrivate } from "hooks";

import { OrganizationListForm } from "./OrganizationListForm";
import { toast } from "react-toastify";
import { SubCategoryMain } from "./OrganizationSubCategory/SubCategoryMain";
const OrganizationListEdit = ({ id, data, onUpdate = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();

  const [userInput, setUserInput] = useState({});

  useEffect(() => {
    setUserInput(data);
  }, [data]);

  const onChange = (name, event) => {
    setUserInput((prev) => ({
      ...prev,
      [name]: event ? event : "",
    }));
  };

  const handleOnSumbit = async (event) => {
    event.preventDefault();
    const response = authAxios.post(`/organization/${id}`, {
      ...userInput,
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
      onUpdate(userInput);
      toggle();
    } finally {
    }
  };

  return (
    <>
      <Button onClick={toggle} color="primary">
        <i className="ion-edit" />
      </Button>

      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>Edit</BootstrapModal.Header>

        <BootstrapModal.Body>
          <Form id="OrganizationEdit" onSubmit={handleOnSumbit}>
            <OrganizationListForm formData={userInput} onChange={onChange} />
          </Form>
          <SubCategoryMain id={id}></SubCategoryMain>

        </BootstrapModal.Body>

        <BootstrapModal.Footer toggle={toggle}>
          <Button form="OrganizationEdit" color="success" type="submit">
            Submit
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};

export { OrganizationListEdit };
