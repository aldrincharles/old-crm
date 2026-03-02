import React from "react";

import { Button, Form } from "reactstrap";
import { toast } from "react-toastify";

import { useAxiosPrivate, useCustomForm, useToggle } from "hooks";
import { BootstrapModal } from "components";

import { SearchActivationForm } from "./form/SearchActivationForm";
import { useParams } from "react-router";

const BasicEdit = ({ data, onSubmit }) => {
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
    search_number: data?.search_number || "",
    status: data?.status || "",
    search_category: data?.search_category || "",
    organization: data?.organization || "",
    activation_date: data?.activation_date
      ? new Date(data.activation_date)
      : new Date(),
    position_count: data?.position_count || "",
    location: data?.location || "",
    geographic_coverage: data?.geographic_coverage || "",
    replacement: data?.replacement || "",
    client_interview_stages_count: data?.client_interview_stages_count || "",
    classification: data?.classification || "",
  };
  const { id } = useParams();
  const authAxios = useAxiosPrivate();

  const {
    formData,
    handleSubmit,
    handleOnChange: updateFields,
  } = useCustomForm(initialValue, (e) => onSumbit(e));

  const onSumbit = async (value) => {
    let response = authAxios.put(`/jobs/${id}/details/information/basic-info`, {
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
    onSubmit(result);
    toggle();
  };

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
      <BootstrapModal.Header>Basic Edit</BootstrapModal.Header>

      <BootstrapModal.Body>
        <Form id="BasicForm" onSubmit={handleSubmit}>
          <SearchActivationForm {...formData} updateFields={updateFields} />
        </Form>
      </BootstrapModal.Body>

      <BootstrapModal.Footer toggle={toggle}>
        <Button color="success" form="BasicForm" type="submit">
          Submit
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
});

export { BasicEdit };
