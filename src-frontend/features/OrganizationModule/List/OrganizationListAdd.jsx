import React, { useContext } from "react";

import { Form, Button } from "reactstrap";

import { OrganizationDetailsForm } from "common";
import { BootstrapModal } from "components";
import { useToggle, useAxiosPrivate, useCustomForm } from "hooks";
import { FetchContext } from "context/FetchContext";
import { toast } from "react-toastify";

export const OrganizationListAdd = () => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Add Organization
      </Button>
      <OrganizationAddDialogue visible={visible} toggle={toggle} />
    </>
  );
};

const OrganizationAddDialogue = ({ visible, toggle }) => {
  const { retrieveData } = useContext(FetchContext);
  const initialFormData = {
    name: "",
    ranking: "",
    industry: "",
    vertical: "",
    solution_type: "",
    client: "",
    website: "",
    global_employee_size: 1,
    global_hq: "",
    local_company: "",
    apac_hq: "",
    apac_offices: [],
    classification: "",
    fiscal_start: "",
  };
  const authAxios = useAxiosPrivate();
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    initialFormData,
    (e) => onSubmit(e)
  );

  const onSubmit = async (value) => {
    const response = authAxios.post(`/organizations`, {
      ...value,
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
      toggle();
      retrieveData();
    } finally {
    }
  };

  return (
    <>
      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>ADD NEW ORGANIZATION</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="AddOrgDetailsForm" onSubmit={handleSubmit}>
            <OrganizationDetailsForm
              formData={formData}
              handleOnChange={handleOnChange}
            />
          </Form>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button color="success" type="submit" form="AddOrgDetailsForm">
            SUBMIT
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
