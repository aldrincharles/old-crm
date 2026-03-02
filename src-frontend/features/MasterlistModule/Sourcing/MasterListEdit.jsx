import React, { useState } from "react";

import { Button, Form, Label } from "reactstrap";
import DatePicker from "react-datepicker";

import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { MasterListForm } from "common";
import { BootstrapModal } from "components";
import { toast } from "react-toastify";

export const MasterListEdit = ({ data, onRefetch = () => {} }) => {
  const initialState = {
    title: data?.title,
    position: data?.position,
    industry: data?.industry,
    location: data?.location,
    sales_specializations: data?.sales_specializations,
    last_edited_date: new Date(),
  };
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const [buttonState, setButtonState] = useState(true);
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );

  const onSubmit = async (e) => {
    setButtonState(false);
    const response = authAxios.put(`/masterlist/${data?.masterlist_id}`, {
      ...e,
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
        <i className="fas fa-table"></i> <i className="ion-edit" />
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="xl">
        <BootstrapModal.Body>
          <Form id="MasterListEdit" onSubmit={handleSubmit}>
            <MasterListForm
              formData={formData}
              handleOnChange={handleOnChange}
            />
            <Label>Last Edited Date</Label>
            <div>
              <DatePicker
                selected={formData.last_edited_date}
                onChange={(date) => handleOnChange("last_edited_date", date)}
              />
            </div>
          </Form>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={!buttonState}
            type="submit"
            form="MasterListEdit"
            color="success"
          >
            {buttonState ? <div>SUBMIT</div> : <div>Processing...</div>}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
