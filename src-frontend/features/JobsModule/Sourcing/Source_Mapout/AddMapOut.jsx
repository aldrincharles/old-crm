import React, { useState } from "react";

import { Button, Form, FormGroup, Label } from "reactstrap";

import { BootstrapModal, AsyncSelectWrap } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { ContactBasicInformationForm } from "common";
import { toast } from "react-toastify";

const initialState = {
  search_strategies: "",
  name: "",
  gender: "",
  school_graduated: "",
  school_ranking: "",
  year_graduated: "",
  organization: "",
  industry: "",
  vertical: "",
  linkedin: "",
  job_title: "",
  seniority: "",
  position: "",
  position_time_frame: new Date(),
  company_time_frame: new Date(),
  personal_email: "",
  work_email: "",
  mobile: "",
  location: "",
  geography: "",
  candidate_category: "",
  internal_grading: "",
  status: "",
  nationality: "",
  languages: [],
  sales_specializations: [],
  dev_specializations: [],
  connections: [],
  source: "",
  sales_profile: "",
};

export const AddMapOut = ({ id, onUpdateValue = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );
  const [buttonState, setButtonState] = useState(true);

  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setButtonState(false);
    const response = authAxios.post(`/jobs/sourcing/add-mapout/${id}`, {
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
      reset();
      toggle();
      onUpdateValue?.();
    } finally {
      setButtonState(true);
    }
  };

  const handleOnBlur = async (event) => {
    let response = authAxios.post(`/jobs/sourcing/add-mapout/check_contact`, {
      name: event,
    });

    try {
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
      const result = response.data;
      setMessage(result?.content.message);
    } finally {
    }
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        NEW CONTACT
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="xl">
        <BootstrapModal.Header>ADD MAP OUT</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="AddMapOutForm" onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Search Strategy</Label>
              <AsyncSelectWrap
                name="search_strategies"
                dependencies={{
                  url: "/parameters",
                  topic: "search_strategies",
                  id: id,
                }}
                type="select"
                value={formData.search_strategies}
                onChange={(e) => {
                  handleOnChange("search_strategies", e);
                }}
                required
              />
            </FormGroup>
            <hr></hr>
            <ContactBasicInformationForm
              message={message}
              formData={formData}
              handleOnChange={handleOnChange}
              handleOnBlur={handleOnBlur}
            />
            <FormGroup>
              <Label>Connections</Label>
              <AsyncSelectWrap
                name="connections"
                dependencies={{ url: "/parameters", topic: "connections" }}
                value={formData.connections}
                onChange={(e) => handleOnChange("connections", e)}
                placeholder="Select connections"
                isMulti
                isClearable
              />
            </FormGroup>
          </Form>

          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={!buttonState}
            type="submit"
            form="AddMapOutForm"
            color="success"
          >
            {buttonState ? <div>SUBMIT</div> : <div>Processing...</div>}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
