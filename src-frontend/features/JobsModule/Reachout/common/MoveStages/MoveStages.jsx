import React from "react";

import { useParams } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { motion } from "framer-motion";

import { BootstrapModal, IconButton, Conditional } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { CandidateResponse } from "./container/CandidateResponse";
import { toast } from "react-toastify";

const stages = [
  { value: 2, label: "Responses" },
  { value: 3, label: "Internal Interview" },
  { value: 4, label: "Submitted to Client" },
  { value: 5, label: "Client Interview" },
  { value: 6, label: "Placement" },
];

export const MoveStages = ({ row }) => {
  const authAxios = useAxiosPrivate();
  const { contact_id } = row.original;
  const { id } = useParams();
  const initialState = {
    move_stage: "",
    response: "",
    type: "",
  };
  const [visible, toggle] = useToggle();
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    try {
      const response = authAxios.post(
        `/jobs/reachout/move-to-stage/${id}/${contact_id}`,
        {
          ...data,
        }
      );

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
    } catch (error) {}
  };

  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }}>
        <IconButton
          style={{
            cursor: "pointer",
          }}
          className="fas fa-cog"
          onClick={toggle}
        />
      </motion.div>

      <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
        <BootstrapModal.Header>MOVE CANDIDATE TO</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="MoveStage" onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Move Candidate To</Label>
              <Input
                id={`moveStage ${contact_id}`}
                name="move_stage"
                type="select"
                value={formData.move_stage}
                onChange={(e) => {
                  handleOnChange("move_stage", e.target.value);
                }}
              >
                <option value="">Choose One</option>
                {stages.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>

              <Conditional if={formData.move_stage === "2"}>
                <CandidateResponse
                  formData={formData}
                  onChange={(name, value) => handleOnChange(name, value)}
                />
              </Conditional>
            </FormGroup>
          </Form>
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button form="MoveStage" type="submit" color="success">
            Move
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
