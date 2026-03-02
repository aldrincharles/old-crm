import React from "react";

import { FormGroup, Input, Label } from "reactstrap";

import { AsyncSelectWrap } from "components";
import { useParams } from "react-router";

const RoadMapForm = ({
  stage_name,
  hiring_manager,
  interview_questions,
  remarks,
  updateFields,
}) => {
  const { id } = useParams();

  return (
    <>
      <FormGroup>
        <Label>Stage Name</Label>
        <Input
          type="text"
          value={stage_name}
          onChange={(e) => updateFields("stage_name", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Hiring Manager</Label>
        <AsyncSelectWrap
          name="hiring_manager"
          dependencies={{
            url: "/parameters",
            topic: "hiring_managers",
            id: id,
          }}
          value={hiring_manager || ""}
          onChange={(event) => updateFields("hiring_manager", event)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Interview Questions</Label>
        <Input
          type="textarea"
          value={interview_questions}
          onChange={(e) => updateFields("interview_questions", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Remarks</Label>
        <Input
          type="textarea"
          value={remarks}
          onChange={(e) => updateFields("remarks", e.target.value)}
        />
      </FormGroup>
    </>
  );
};

export { RoadMapForm };
