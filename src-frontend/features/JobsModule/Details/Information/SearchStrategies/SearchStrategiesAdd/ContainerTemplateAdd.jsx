import React, { useContext, useState } from "react";

import { Form, Button, Card, CardBody } from "reactstrap";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import { useAxiosPrivate } from "hooks";

import { TemplateForm } from "./form/TemplateForm";
import { SearchStrategiesContext } from "../context/SearchStrategiesContext";

const ContainerTemplateAdd = ({ toggle }) => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const { refetch } = useContext(SearchStrategiesContext);

  const handleOnChange = (name, event) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: event ? event : "",
      };
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = authAxios.post(
      `/jobs/${id}/details/information/search-strategy/template`,
      {
        ...formData,
      }
    );
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
    refetch();
    toggle();
  };

  return (
    <>
      <Form id="SearchStratTemplateForm" onSubmit={onSubmit}>
        <Card>
          <CardBody>
            <TemplateForm formData={formData} updateFields={handleOnChange} />
          </CardBody>
        </Card>
      </Form>
      <div className="mt-2 d-flex justify-content-end">
        <Button color="success" form="SearchStratTemplateForm" type="submit">
          Submit
        </Button>
      </div>
    </>
  );
};

export { ContainerTemplateAdd };
