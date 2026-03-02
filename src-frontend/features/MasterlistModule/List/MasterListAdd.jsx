import React, { useState } from "react";

import { Button, Form } from "reactstrap";

import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { MasterListForm } from "common";
import { BootstrapModal } from "components";
import { toast } from "react-toastify";

export const MasterListAdd = ({ onRefetch = () => null }) => {
  const initialState = {
    title: "",
    position: "",
    industry: "",
    sales_specializations: [],
    location: "",
  };
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const [buttonState, setButtonState] = useState(true);
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    setButtonState(false);
    const response = authAxios.post(`/masterlist`, {
      ...data,
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
      toggle();
      onRefetch();
    } finally {
      setButtonState(true);
    }
  };

  return (
    <>
      <Button color="primary" className="my-1" onClick={toggle}>
        <i className="fas fa-table"></i> Add
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="xl">
        <BootstrapModal.Body>
          <Form id="MasterListAdd" onSubmit={handleSubmit}>
            <MasterListForm
              formData={formData}
              handleOnChange={handleOnChange}
            />
          </Form>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={!buttonState}
            type="submit"
            form="MasterListAdd"
            color="success"
          >
            {buttonState ? <div>SUBMIT</div> : <div>Processing...</div>}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
