import React, { useState } from "react";

import { Button, Label, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";

import { BootstrapModal, AsyncSelectWrap } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";

export const CDLinkedinConnectionsEdit = ({
  data,
  id,
  onRefetch = () => null,
}) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const [buttonState, setButtonState] = useState(true);
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    { connections: data?.connections },
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    setButtonState(false);
    try {
      let response = authAxios.put(`/contact/${id}/linkedin-connections`, {
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
      toggle();
      onRefetch(result.content);
    } catch (error) {
    } finally {
      setButtonState(true);
    }
  };

  return (
    <>
      <Button size="lg" color="primary" onClick={toggle}>
        <i className="ion-edit" />
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
        <BootstrapModal.Body>
          <Form id="LinkedInConnectionsEdit" onSubmit={handleSubmit}>
            <FormGroup>
              <Label>LinkedIn Connections</Label>
              <AsyncSelectWrap
                name="connections"
                dependencies={{ url: "/parameters", topic: "connections" }}
                value={formData.connections}
                onChange={(e) => handleOnChange("connections", e)}
                isClearable
                isMulti
              />
            </FormGroup>
          </Form>
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={!buttonState}
            type="submit"
            form="LinkedInConnectionsEdit"
            color="success"
          >
            {buttonState ? <div>SUBMIT</div> : <div>Processing...</div>}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
