import React from "react";

import { Button, Form } from "reactstrap";

import { useAxiosPrivate, useToggle, useCustomForm, useLoading } from "hooks";
import { BootstrapModal } from "components";
import CDPreviousRoleForm from "./CDPreviousRoleForm";
import { toast } from "react-toastify";

export const CDPreviousRoleEdit = ({
  data,
  id,
  onUpdateValues = () => null,
  onRefetch = () => null,
}) => {
  const initialState = {
    job_title: data?.job_title || "",
    organization: data?.organization || "",
    position: data?.position || "",
    seniority: data?.seniority || "",
    location: data?.location || "",
    geography: data?.geography || "",
    industry: data?.industry || "",
    vertical: data?.vertical || "",
    sales_specializations: data?.sales_specializations || [],
    time_frame: data.time_frame ? new Date(data.time_frame) : new Date(),
    winners_club: data?.winners_club || false,
  };
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );

  const fetchSubmit = async (data) => {
    try {
      let response = authAxios.put(`/contact/${id}/previous-role`, {
        ...data,
      });

      response = await toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });
      const result = response.data;
      onUpdateValues(result.content);
      toggle();
    } catch (error) {}
  };

  const fetchDelete = async () => {
    try {
      const response = authAxios.delete(`/contact/${id}/previous-role`, {
        data: { previous_role_id: data?.previous_role_id },
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
    } catch (error) {}
  };

  const [onSubmit, isSubmitLoading] = useLoading(fetchSubmit);
  const [onDelete, isDeleteLoading] = useLoading(fetchDelete);

  return (
    <>
      <Button size="lg" color="primary" onClick={toggle}>
        <i className="ion-edit" />
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="xl">
        <BootstrapModal.Header>Edit Previous Role</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="CDPreviousRoleEdit" onSubmit={handleSubmit}>
            <CDPreviousRoleForm
              formData={formData}
              handleOnChange={handleOnChange}
            />
          </Form>
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={isDeleteLoading}
            color="danger"
            type="submit"
            onClick={onDelete}
          >
            {isDeleteLoading ? "Deleting..." : "Delete"}
          </Button>
          <Button
            disabled={isSubmitLoading}
            type="submit"
            form="CDPreviousRoleEdit"
            color="success"
          >
            {isSubmitLoading ? "Processing" : "Submit"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
