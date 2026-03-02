import React, { useContext, useState } from "react";

import { Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { useAxiosPrivate, useToggle } from "hooks";
import { BootstrapModal } from "components";

import { SearchStrategiesContext } from "../context/SearchStrategiesContext";
import { StrategiesEditForm } from "./form/StrategiesEditForm";

const SearchStrategiesEdit = ({ data }) => {
  const [visible, toggle] = useToggle();
  return (
    <>
      <Button color="primary" onClick={toggle} className="no-print">
        <i className="ion-edit" />
      </Button>
      <ComponentDialogue data={data} visible={visible} toggle={toggle} />
    </>
  );
};

const ComponentDialogue = React.memo(({ data, visible, toggle }) => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();
  const { refetch } = useContext(SearchStrategiesContext);

  const [formData, setFormData] = useState({
    status: data?.status || "",
    date_started: data?.date_started ? new Date(data.date_started) : null,
    date_finished: data?.date_finished ? new Date(data.date_finished) : null,
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = authAxios.put(
      `/jobs/${id}/details/information/search-strategy`,
      {
        id: data.id,
        formData,
      }
    );

    await toast.promise(response, {
      pending: "Pending",
      success: {
        render({ data }) {
          const message = data.data?.message;
          return `${message} 👌`;
        },
      },
      error: "Oops! Something went wrong 🤯",
    });

    toggle();
    refetch();
  };

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
      <BootstrapModal.Header>
        Edit Index {data.strategy_index}
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form id="SearchStratEdit" onSubmit={onSubmit}>
          <StrategiesEditForm form={formData} setFormData={setFormData} />
        </Form>
      </BootstrapModal.Body>
      <BootstrapModal.Footer toggle={toggle}>
        <Button color="success" form="SearchStratEdit" type="submit">
          Submit
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
});

export { SearchStrategiesEdit };
