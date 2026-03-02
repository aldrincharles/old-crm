import React from "react";

import { Form, Button } from "reactstrap";

import { OrganizationDetailsForm } from "common";
import { BootstrapModal } from "components";
import { useToggle, useAxiosPrivate, useCustomForm } from "hooks";
import { toast } from "react-toastify";

export const OrganizationListEdit = ({ data, id, onRefetch = () => null }) => {
  const initialFormData = {
    name: data?.name || "",
    ranking: data?.ranking || "",
    industry: data?.industry || "",
    vertical: data?.vertical || "",
    solution_type: data?.solution_type || "",
    client: data?.client || "",
    website: data?.website || "",
    global_employee_size: data?.global_employee_size || "",
    global_hq: data?.global_hq || "",
    local_company: data?.local_company || "",
    apac_hq: data?.apac_hq || "",
    apac_offices: data?.apac_offices || [],
    classification: data?.classification || "",
    fiscal_start: data?.fiscal_start || "",
  };
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    initialFormData,
    (e) => onSubmit(e)
  );

  const onSubmit = async (value) => {
    const response = authAxios.put(`/organization/${id}`, {
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
      onRefetch();
      toggle();
    } finally {
    }
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i className="ion-edit" />
      </Button>
      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>EDIT ORGANIZATION</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="EditOrgDetailsForm" onSubmit={handleSubmit}>
            <OrganizationDetailsForm
              formData={formData}
              handleOnChange={handleOnChange}
            />
          </Form>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button color="success" type="submit" form="EditOrgDetailsForm">
            SUBMIT
          </Button>
        </BootstrapModal.Footer>
        {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      </BootstrapModal>
    </>
  );
};
