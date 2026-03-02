import React from "react";

import { FormGroup, Input, Label } from "reactstrap";
import { AsyncSelectWrap } from "components";

const HiringManagersForm = ({ formData, updateFields }) => {
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);
  return (
    <>
      {/* {formData === "" ? (
        <FormGroup>
          <Label for="position">Name</Label>
          <AsyncSelectWrap
            name="hiring_managers"
            dependencies={{ url: "/parameters", topic: "contact" }}
            value={formData.name || ""}
            onChange={(event) => updateFields("name", event)}
            required
          />
        </FormGroup>
      ) : null} */}
      <FormGroup>
        <Label for="position">Name</Label>
        <AsyncSelectWrap
          name="hiring_managers"
          dependencies={{ url: "/parameters", topic: "contact" }}
          value={formData.name || ""}
          onChange={(event) => updateFields("name", event)}
          isDisabled={formData.name !== "" ? true : false}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="position">Career Summary</Label>
        <Input
          type="textarea"
          name="career_summary"
          value={formData.career_summary || ""}
          onChange={(event) =>
            updateFields("career_summary", event.target.value)
          }
        />
      </FormGroup>
      <FormGroup>
        <Label for="position">Interview Style</Label>
        <Input
          type="textarea"
          name="interview_style"
          value={formData.interview_style || ""}
          onChange={(event) =>
            updateFields("interview_style", event.target.value)
          }
        />
      </FormGroup>
      <FormGroup>
        <Label for="position">Interview Questions</Label>
        <Input
          type="textarea"
          name="interview_questions"
          value={formData.interview_questions || ""}
          onChange={(event) =>
            updateFields("interview_questions", event.target.value)
          }
        />
      </FormGroup>
      <FormGroup>
        <Label for="position">General Overview</Label>
        <Input
          type="textarea"
          name="general_overview"
          value={formData.general_overview || ""}
          onChange={(event) =>
            updateFields("general_overview", event.target.value)
          }
        />
      </FormGroup>
    </>
  );
};

export { HiringManagersForm };
