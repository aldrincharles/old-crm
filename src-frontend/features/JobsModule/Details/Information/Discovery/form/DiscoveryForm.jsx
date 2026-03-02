import React from "react";

import { FormGroup, Label } from "reactstrap";
import { AsyncSelectWrap } from "components";

const DiscoveryForm = ({ name, updateFields }) => {
  return (
    <>
      <FormGroup>
        <Label for="position">Name</Label>
        <AsyncSelectWrap
          name="discovery"
          dependencies={{ url: "/parameters", topic: "contact" }}
          value={name || ""}
          onChange={(event) => updateFields("name", event)}
          required
        />
      </FormGroup>
    </>
  );
};

export { DiscoveryForm };
