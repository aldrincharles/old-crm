import React from "react";

import { FormGroup, Label } from "reactstrap";
import { AsyncSelectWrap } from "components";

const HiringManagersForm = ({ name, updateFields }) => {
  return (
    <>
      <FormGroup>
        <Label for="position">Name</Label>
        <AsyncSelectWrap
          name="hiring_managers"
          dependencies={{ url: "/parameters", topic: "contact" }}
          value={name || ""}
          onChange={(event) => updateFields("name", event)}
          required
        />
      </FormGroup>
    </>
  );
};

export { HiringManagersForm };
