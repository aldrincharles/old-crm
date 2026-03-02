import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useParams } from "react-router-dom";
import Select from "react-select";

import { IconButton, BootstrapModal, HoverTooltip } from "components";
import { useToggle, useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

const options = [
  { value: "-", label: "-" },
  { value: "Needs Updating", label: "Needs Updating" },
  { value: "Dead Profile", label: "Dead Profile" },
  { value: "Do Not Touch", label: "Do Not Touch" },
];

const style = {
  cursor: "pointer",
};

export const SourcingComment = ({ row, onUpdateValues = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const { candidate_category, contact_id, comment } = row.original;

  const { id } = useParams();
  const [visible, toggle] = useToggle();
  const [userInput, setUserInput] = useState({
    comment: "",
    candidateCategory: candidate_category,
  });

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setUserInput({
      candidateCategory: candidate_category,
    });
  }, [candidate_category]);

  const handleOnChange = (name, event) => {
    setUserInput({
      ...userInput,
      [name]: event ? event : "",
    });
  };

  const handleOnSumbit = async (event) => {
    event.preventDefault();

    const response = authAxios.post(`/sourcing/comment/${id}/${contact_id}`, {
      comment: userInput.comment,
      candidateCategory: userInput.candidateCategory,
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
      onUpdateValues({
        comment: userInput.comment,
        candidate_category: userInput.candidateCategory,
      });
      setUserInput({ ...userInput, comment: "" });
      toggle();
    } finally {
    }
  };

  return (
    <>
      <HoverTooltip id={row.id} hoverText={comment} placement="top">
        <motion.div whileHover={{ scale: 1.2 }}>
          <IconButton
            style={style}
            className={comment ? `fa fa-comment text-primary` : `fa fa-comment`}
            onClick={toggle}
          />
        </motion.div>
      </HoverTooltip>

      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>Sourcing Comment</BootstrapModal.Header>
        <BootstrapModal.Body>
          <h5 className="lh-3 mg-b-5">Current Comment</h5>
          {comment ? (
            <p className="mg-b-20"> {comment}</p>
          ) : (
            <p className="mg-b-20"> No comment added...</p>
          )}

          <Form id="SourcingCommentForm" onSubmit={handleOnSumbit}>
            <FormGroup>
              <Label className="mt-4">Add New Comment</Label>
              <Input
                name="comment"
                type="textarea"
                value={userInput.comment}
                onChange={(event) =>
                  handleOnChange("comment", event.target.value)
                }
                placeholder="Add Comment Here"
              />
              <Label className="mt-4">Profile Notice</Label>
              <Select
                id={`candidateCategory_${row.id}`}
                name="candidateCategory"
                options={options}
                value={userInput.candidateCategory}
                onChange={(event) => handleOnChange("candidateCategory", event)}
                isSearchable
              />
            </FormGroup>
          </Form>
          {/* <pre>{JSON.stringify(userInput, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button form="SourcingCommentForm" color="success" type="submit">
            Submit
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
