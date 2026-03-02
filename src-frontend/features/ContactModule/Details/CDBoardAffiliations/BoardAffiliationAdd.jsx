import React from "react";

import { toast } from "react-toastify";
import { Form, FormGroup, Label, Button } from "reactstrap";

import { useAxiosPrivate, useToggle, useLoading, useCustomForm } from "hooks";
import { BootstrapModal, AsyncSelectWrap, CustomDatePicker } from "components";

export const BoardAffiliationAdd = ({ url, onRefetch = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    {
      organization: "",
      start_date: new Date(),
    },
    (e) => onSubmit(e)
  );

  const fetchSubmit = async () => {
    try {
      const response = authAxios.post(url, {
        ...formData,
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

      onRefetch();
      reset();
      toggle();
    } catch (error) {}
  };

  const [onSubmit, isLoading] = useLoading(fetchSubmit);

  return (
    <>
      <Button size="lg" color="primary" onClick={toggle}>
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="sm">
        <BootstrapModal.Body>
          <Form id="BoardAffiliationAdd" onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Organization: </Label>
              <AsyncSelectWrap
                name="organization"
                dependencies={{ url: "/parameters", topic: "organization" }}
                value={formData.organization}
                onChange={(e) => handleOnChange("organization", e)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Start Date: </Label>
              <CustomDatePicker
                selected={formData.start_date}
                onChange={(e) => handleOnChange("start_date", e)}
                dateFormat="MMMM yyyy"
              />
            </FormGroup>
          </Form>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={isLoading}
            type="submit"
            form="BoardAffiliationAdd"
            color="success"
          >
            {isLoading ? "Processing" : "Add"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
