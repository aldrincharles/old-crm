import React from "react";

import { Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router";

import { useAxiosPrivate, useCustomForm, useToggle } from "hooks";
import { BootstrapModal } from "components";

import { HiringManagersForm } from "./form/HiringManagersForm";

const HiringManagersEdit = ({ data, onRefetch }) => {
  const [visible, toggle] = useToggle();
  return (
    <>
      <Button color="primary" onClick={toggle} className="no-print">
        <i className="ion-edit" />
      </Button>
      <ComponentDialogue
        data={data}
        visible={visible}
        toggle={toggle}
        onRefetch={onRefetch}
      />
    </>
  );
};

const ComponentDialogue = React.memo(({ data, visible, toggle, onRefetch }) => {
  const { id } = useParams();
  const authAxios = useAxiosPrivate();
  const initialValue = {
    name: { label: data.name, value: data.id } || "",
    career_summary: data.career_summary || "",
    interview_style: data.interview_style || "",
    interview_questions: data.interview_questions || "",
    general_overview: data.general_overview || "",
  };

  const {
    formData,
    handleSubmit,
    handleOnChange: updateFields,
    reset,
  } = useCustomForm(initialValue, (e) => onSubmit(e));

  const onSubmit = async (value) => {
    let response = authAxios.put(
      `organization/${id}/search-support/hiring-managers`,
      {
        id: data.id,
        ...formData,
      }
    );
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

    onRefetch();
    reset();
    toggle();
  };

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
      <BootstrapModal.Header>Edit Hiring Manager</BootstrapModal.Header>

      <BootstrapModal.Body>
        <Form id="RoadMapAddForm" onSubmit={handleSubmit}>
          <HiringManagersForm formData={formData} updateFields={updateFields} />
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

export { HiringManagersEdit };
