import React, { useState } from "react";

import { Button, Label, Form, FormGroup } from "reactstrap";

import { BootstrapModal, AsyncSelectWrap } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

export const CompetitorsEdit = ({ data, url, onRefetch = () => null }) => {
  const initialValue = {
    competitors: data?.competitors || "",
  };

  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    initialValue,
    (e) => onSubmit(e)
  );
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    let response = authAxios.post(url, {
      ...data,
    });

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
      toggle();
      onRefetch(result.content);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i className="ion-edit" />
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
        <BootstrapModal.Body>
          <Form id="RevenueEditForm" onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Competitor Name</Label>
              <AsyncSelectWrap
                name="competitors"
                value={formData.competitors}
                dependencies={{
                  url: "/parameters",
                  topic: "organization",
                }}
                onChange={(e) => handleOnChange("competitors", e)}
                isClearable
                isMulti
              />
            </FormGroup>
          </Form>

          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={isLoading}
            type="submit"
            form="RevenueEditForm"
            color="success"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
