import React from "react";

import { Button, Form } from "reactstrap";
import { toast } from "react-toastify";

import { useAxiosPrivate, useCustomForm, useToggle } from "hooks";
import { BootstrapModal } from "components";
import { KeyOverviewForm } from "./form/KeyOverviewForm";
import { useParams } from "react-router";

const KeyOverviewEdit = ({ data, onSubmit }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="primary" onClick={toggle} className="no-print">
        <i className="ion-edit" />
      </Button>
      <ComponentDialogue
        data={data}
        onSubmit={onSubmit}
        visible={visible}
        toggle={toggle}
      />
    </>
  );
};

const ComponentDialogue = React.memo(({ data, onSubmit, visible, toggle }) => {
  const initialValue = {
    company_overview: data?.company_overview || "",
    why_change: data?.why_change || "",
    target_compensation: data?.target_compensation || "",
    size_team: data?.size_team || "",
    position_overview: data?.position_overview || "",
    experience: data?.experience || "",
    key_attributes: data?.key_attributes || "",
    personality: data?.personality || "",
    vertical_specialization: data?.vertical_specialization || "",
    commission_targets: data?.commission_targets || "",
  };

  const { id } = useParams();
  const authAxios = useAxiosPrivate();

  const {
    formData,
    handleSubmit,
    handleOnChange: updateFields,
  } = useCustomForm(initialValue, (e) => onSumbit(e));

  const onSumbit = async (value) => {
    let response = authAxios.put(
      `/jobs/${id}/details/information/key-overview`,
      {
        ...value,
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
    onSubmit(result);
    toggle();
  };

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
      <BootstrapModal.Header>Key Overview Edit</BootstrapModal.Header>

      <BootstrapModal.Body>
        <Form id="KeyOverviewForm" onSubmit={handleSubmit}>
          <KeyOverviewForm {...formData} updateFields={updateFields} />
        </Form>
      </BootstrapModal.Body>

      <BootstrapModal.Footer toggle={toggle}>
        <Button color="success" form="KeyOverviewForm" type="submit">
          Submit
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
});

export { KeyOverviewEdit };
