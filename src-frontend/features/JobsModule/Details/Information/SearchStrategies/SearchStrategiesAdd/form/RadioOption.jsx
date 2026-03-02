import React from "react";

import { Input, Label, FormGroup } from "reactstrap";
const RadioOption = ({ value, setValue }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <FormGroup className="me-2">
        <Input
          type="radio"
          name="radio1"
          value="Template"
          checked={value === "Template"}
          onChange={(e) => setValue(e.target.value)}
        />
        <Label check>Template</Label>
      </FormGroup>
      <FormGroup>
        <Input
          type="radio"
          name="radio1"
          value="Custom"
          checked={value === "Custom"}
          onChange={(e) => setValue(e.target.value)}
        />
        <Label check>Custom</Label>
      </FormGroup>
    </div>
  );
};

export { RadioOption };
