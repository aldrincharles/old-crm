import React from "react";

import { Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router";

import { useAxiosPrivate, useCustomForm, useToggle } from "hooks";
import { BootstrapModal } from "components";

import { RoadMapForm } from "./form/RoadMapForm";

const RoadMapEdit = ({ data, onEdit }) => {
  const [visible, toggle] = useToggle();
  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i className="ion-edit" />
      </Button>
      <ComponentDialogue
        data={data}
        onEdit={onEdit}
        visible={visible}
        toggle={toggle}
      />
    </>
  );
};

const ComponentDialogue = React.memo(({ data, onEdit, visible, toggle }) => {
  const initialValue = {
    id: data?.id || "",
    stage_name: data?.stage_name || "",
    hiring_manager: data?.hiring_manager || "",
    interview_questions: data?.interview_questions || "",
    remarks: data?.remarks || "",
  };

  const { id } = useParams();
  const authAxios = useAxiosPrivate();

  const {
    formData,
    handleSubmit,
    handleOnChange: updateFields,
  } = useCustomForm(initialValue, (e) => onSubmit(e));

  const onSubmit = async (value) => {
    let response = authAxios.put(`/jobs/${id}/details/road-map`, {
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
    onEdit(result);
    toggle();
  };

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
      <BootstrapModal.Header>Edit {data?.stage_name}</BootstrapModal.Header>

      <BootstrapModal.Body>
        <Form id="RoadMapEditForm" onSubmit={handleSubmit}>
          <RoadMapForm {...formData} updateFields={updateFields} />
        </Form>
      </BootstrapModal.Body>

      <BootstrapModal.Footer toggle={toggle}>
        <Button color="success" form="RoadMapEditForm" type="submit">
          Submit
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
});

export { RoadMapEdit };
