import React, { useState } from "react";

import { toast } from "react-toastify";
import { Button, Form } from "reactstrap";

import { useAxiosPrivate, useToggle, useCustomForm } from "hooks";
import { BootstrapModal } from "components";
import CDPreviousRoleForm from "./CDPreviousRoleForm";

export const CDPreviousRoleAdd = ({ id = "", onRefetch = () => null }) => {
  const initialState = {
    job_title: "",
    organization: "",
    position: "",
    seniority: "",
    location: "",
    geography: "",
    industry: "",
    vertical: "",
    sales_specializations: [],
    time_frame: new Date(),
    winners_club: false,
  };
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const [isLoading, setIsLoading] = useState(false);
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = authAxios.post(`/contact/${id}/previous-role`, {
        ...data,
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

      toggle();
      onRefetch();
      reset();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button size="lg" color="primary" onClick={toggle}>
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="xl">
        <BootstrapModal.Header>Add Previous Role</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="CDPreviousRoleAdd" onSubmit={handleSubmit}>
            <CDPreviousRoleForm
              formData={formData}
              handleOnChange={handleOnChange}
            />
          </Form>

          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={isLoading}
            type="submit"
            form="CDPreviousRoleAdd"
            color="success"
          >
            {isLoading ? "Processing..." : "Submit"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
