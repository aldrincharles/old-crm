import React, { useState, useContext } from "react";

import { Button, Form, FormGroup, Label } from "reactstrap";

import { BootstrapModal, AsyncSelectWrap } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { ContactBasicInformationForm } from "common";
import { FetchContext } from "context/FetchContext";
import { toast } from "react-toastify";

const initialState = {
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
};

export const AddContact = () => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button className="me-1" color="primary" onClick={toggle}>
        New Contact
      </Button>
      <AddContactDialogue visible={visible} toggle={toggle} />
    </>
  );
};

const AddContactDialogue = React.memo(({ visible, toggle }) => {
  const authAxios = useAxiosPrivate();
  const { retrieveData } = useContext(FetchContext);
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );
  const [buttonState, setButtonState] = useState(true);

  const onSubmit = async (data) => {
    setButtonState(false);
    try {
      const response = authAxios.post(`/contact`, {
        ...data,
      });
      toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });

      reset();
      toggle();
      retrieveData();
    } finally {
      setButtonState(true);
    }
  };

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="xl">
      <BootstrapModal.Header>ADD NEW CONTACT</BootstrapModal.Header>
      <BootstrapModal.Body>
        <Form id="AddContactForm" onSubmit={handleSubmit}>
          <ContactBasicInformationForm
            formData={formData}
            handleOnChange={handleOnChange}
          />
          <FormGroup>
            <Label>Connections</Label>
            <AsyncSelectWrap
              name="position"
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
          form="AddContactForm"
          color="success"
        >
          {buttonState ? <div>SUBMIT</div> : <div>Processing...</div>}
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
});
