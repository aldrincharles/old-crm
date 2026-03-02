import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import { BootstrapModal } from "components";
import { useCustomForm, useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

export const SubmissionDetails = ({
  visible,
  toggle,
  reachout_id,
  onUpdateValues = () => {},
}) => {
  const authAxios = useAxiosPrivate();
  const { formData, handleSubmit, handleOnChange, reset } = useCustomForm(
    {
      hcm_platform: "",
      comments: "",
    },
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    let response = authAxios.post(
      `/jobs/reachout/submitted-for-interview/${reachout_id}`,
      {
        ...data,
      }
    );

    try {
      response = await toast.promise(response, {
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
      onUpdateValues({
        ...result,
      });
      reset();
      toggle();
    } finally {
    }
  };

  return (
    <>
      <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
        <BootstrapModal.Header>Submit to Client Details</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="SubmittedToClientDetails" onSubmit={handleSubmit}>
            <FormGroup>
              <Label>HCM Platform</Label>
              <Input
                type="text"
                name="hcm_platform"
                maxLength={24}
                value={formData.time_zone}
                onChange={(e) => handleOnChange("hcm_platform", e.target.value)}
                placeholder="Place HCM Platform here..."
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Comments</Label>
              <Input
                type="textarea"
                name="comments"
                maxLength={84}
                value={formData.time_zone}
                onChange={(e) => handleOnChange("comments", e.target.value)}
                placeholder="Place HCM Platform here..."
                required
              />
            </FormGroup>
          </Form>
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button form="SubmittedToClientDetails" type="submit" color="success">
            Save
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
