import React from "react";

import { Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router";

import { useAxiosPrivate, useCustomForm, useToggle } from "hooks";
import { BootstrapModal } from "components";

import { CDBPersonnelForm } from "./form/CDBPersonnelForm";

const CDBEdit = ({ data, onSubmit }) => {
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
    id: data?.id || "",
    name: data?.name || "",
    position: data?.position || "",
    linkedin: data?.linkedin || "",
    email: data?.email || "",
    mobile_number: data?.mobile_number || "",
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
      `/jobs/${id}/details/information/talent-personnel`,
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
      <BootstrapModal.Header>CDB Personnel Edit</BootstrapModal.Header>

      <BootstrapModal.Body>
        <Form id="CDBForm" onSubmit={handleSubmit}>
          <CDBPersonnelForm {...formData} updateFields={updateFields} />
        </Form>
      </BootstrapModal.Body>

      <BootstrapModal.Footer toggle={toggle}>
        <Button color="success" form="CDBForm" type="submit">
          Submit
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
});

export { CDBEdit };
