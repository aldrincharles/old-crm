import "./style/formStyle.css";
import React from "react";

import { FormGroup, Input, Label } from "reactstrap";

const BasicInfoForm = ({ info, setInfo }) => {
  const updateFields = (name, event) => {
    setInfo((prev) => {
      return {
        ...prev,
        [name]: event ? event : "",
      };
    });
  };

  return (
    <>
      <FormGroup>
        <Label>
          Title: <sup>*</sup>
        </Label>
        <Input
          type="text"
          value={info.title || ""}
          onChange={(e) => updateFields("title", e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>
          Strategy Summary: <sup>*</sup>
        </Label>
        <Input
          type="textarea"
          value={info.summary || ""}
          onChange={(e) => updateFields("summary", e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>
          Remarks: <sup>*</sup>
        </Label>
        <Input
          type="textarea"
          value={info.remarks || ""}
          onChange={(e) => updateFields("remarks", e.target.value)}
          required
        />
      </FormGroup>
    </>
  );
};

export { BasicInfoForm };
