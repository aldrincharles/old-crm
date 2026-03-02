import React from "react";

import { Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router";

import { useAxiosPrivate, useCustomForm, useToggle } from "hooks";
import { BootstrapModal } from "components";

import { RoadMapForm } from "./form/RoadMapForm";

const RoadMapAdd = ({ onAdd }) => {
  const [visible, toggle] = useToggle();
  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i className="ion-plus-circled" />
      </Button>
      <ComponentDialogue onAdd={onAdd} visible={visible} toggle={toggle} />
    </>
  );
};

const ComponentDialogue = React.memo(({ onAdd, visible, toggle }) => {
  const initialValue = {
    stage_name: "",
    hiring_manager: "",
    interview_questions: "",
    remarks: "",
  };

  const { id } = useParams();
  const authAxios = useAxiosPrivate();

  const {
    formData,
    handleSubmit,
    handleOnChange: updateFields,
    reset,
  } = useCustomForm(initialValue, (e) => onSubmit(e));

  const onSubmit = async (value) => {
    let response = authAxios.post(`/jobs/${id}/details/road-map`, {
      ...value,
    });

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
    const result = response.data.content;
    onAdd(result);
    reset();
    toggle();
  };

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
      <BootstrapModal.Header>Add</BootstrapModal.Header>

      <BootstrapModal.Body>
        <Form id="RoadMapAddForm" onSubmit={handleSubmit}>
          <RoadMapForm {...formData} updateFields={updateFields} />
        </Form>
      </BootstrapModal.Body>

      <BootstrapModal.Footer toggle={toggle}>
        <Button color="success" form="RoadMapAddForm" type="submit">
          Submit
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
});

export { RoadMapAdd };
