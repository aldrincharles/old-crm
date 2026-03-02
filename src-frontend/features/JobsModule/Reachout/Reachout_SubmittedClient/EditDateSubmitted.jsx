import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { Button, Form } from "reactstrap";
import DatePicker from "react-datepicker";

import { useToggle, useAxiosPrivate } from "hooks";
import { BootstrapModal } from "components";
import { toast } from "react-toastify";

export const EditDateSubmitted = ({ row, onUpdateValues = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();

  const { date_submitted, reachout_id } = row.original;
  const dateDisplay = new Date(date_submitted);

  const [userInput, setUserInput] = useState({
    dateSubmitted: new Date(date_submitted),
  });

  useEffect(() => {
    setUserInput({
      dateSubmitted: new Date(date_submitted),
    });
  }, [date_submitted]);

  const handleOnChange = (name, event) => {
    setUserInput({
      ...userInput,
      [name]: event ? event : "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = authAxios.post(
      `/jobs/reachout/edit-submitted-date/${reachout_id}`,
      {
        date_submitted: userInput.dateSubmitted,
      }
    );
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
      onUpdateValues({
        date_submitted: new Date(result.date_submitted),
      });
      toggle();
    } finally {
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="icon-button"
        onClick={toggle}
      >
        {dateDisplay.toLocaleDateString()}
      </motion.div>
      <BootstrapModal isOpen={visible} toggle={toggle} size="sm">
        <BootstrapModal.Header>Date Submitted</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="EditDateSubmitted" onSubmit={handleSubmit}>
            <DatePicker
              selected={userInput.dateSubmitted}
              onChange={(e) => handleOnChange("dateSubmitted", e)}
            />
          </Form>
          {/* <pre>{JSON.stringify(userInput, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button form="EditDateSubmitted" type="submit" color="success">
            Submit
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
