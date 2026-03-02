import React, { useContext } from "react";

import { Form, Button, Card, CardBody } from "reactstrap";
import { toast } from "react-toastify";

import { FetchContext } from "context/FetchContext";
import { BootstrapModal } from "components";
import { useToggle, useAxiosPrivate, useCustomForm } from "hooks";

import { UserForm } from "./form/UserForm";

export const JobDetailsAdd = () => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Add Job
      </Button>
      <JobsAddDialogue visible={visible} toggle={toggle} />
    </>
  );
};

const JobsAddDialogue = React.memo(({ visible, toggle }) => {
  const authAxios = useAxiosPrivate();
  const { retrieveData } = useContext(FetchContext);
  const initialFormData = {
    title: "",
    organization: "",
    classification: "",
  };

  const {
    formData,
    handleOnChange: updateFields,
    handleSubmit,
    reset,
  } = useCustomForm(initialFormData, (e) => onSubmit(e));

  const onSubmit = async (value) => {
    try {
      const response = authAxios.post("/jobs", {
        ...value,
      });

      toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });

      reset();
      retrieveData();
      toggle();
    } catch (error) {}
  };

  return (
    <>
      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>Add Job</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Card>
            <CardBody>
              <Form id="AddJobDetailsForm" onSubmit={handleSubmit}>
                <UserForm {...formData} updateFields={updateFields} />
              </Form>
            </CardBody>
          </Card>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button color="success" form="AddJobDetailsForm" type="submit">
            Submit
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
});
