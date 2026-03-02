import React, { useState } from "react";

import { Button, Form, Alert, FormGroup, Label } from "reactstrap";
import DatePicker from "react-datepicker";

import { BootstrapModal, Conditional, InputWrap } from "components";
import { useToggle, useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

export const InternalInterviewEdit = ({
  interview_data_id,
  onUpdateValues = () => {},
}) => {
  const authAxios = useAxiosPrivate();
  const initialState = {
    number_of_followups: "",
    date_last_contacted: new Date(),
  };
  const [userInput, setUserInput] = useState(initialState);
  const [error, setError] = useState(null);
  const [visible, toggle] = useToggle();

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setUserInput({
      ...userInput,
      [event.target.name]: value,
    });
  };

  const handleDatePicker = (name, selectedDate) => {
    setUserInput({
      ...userInput,
      [name]: selectedDate,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = authAxios.post(
        `/analytics-report/internal-interview/edit/${interview_data_id}`,
        {
          number_of_followups: userInput.number_of_followups,
          date_last_contacted: userInput.date_last_contacted,
        }
      );

      response = await toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });

      const result = response.data;
      const { table_date_last_contacted } = result.content;
      onUpdateValues({
        table_date_last_contacted: table_date_last_contacted,
        table_number_of_followups: userInput.number_of_followups,
      });
      setUserInput(initialState);
      setError(null);
      toggle();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        <i className="ion-edit" />
      </Button>
      <BootstrapModal size="sm" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>Edit</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Conditional if={error}>
            <Alert color="danger">{error}</Alert>
          </Conditional>
          <Form id="InternalInterviewReportsForm" onSubmit={handleFormSubmit}>
            <label>Date Last Contacted</label>
            <DatePicker
              selected={userInput.date_last_contacted}
              onChange={handleDatePicker.bind(this, "date_last_contacted")}
              dateFormat="MM/dd/yyyy"
            />
            <FormGroup>
              <Label>Number of Followups Made</Label>
              <InputWrap
                name="number_of_followups"
                type="number"
                placeholder="0"
                min="0"
                value={userInput.number_of_followups}
                onChange={handleChange}
              />
            </FormGroup>
          </Form>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            form="InternalInterviewReportsForm"
            color="success"
            type="submit"
          >
            Submit
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </div>
  );
};
