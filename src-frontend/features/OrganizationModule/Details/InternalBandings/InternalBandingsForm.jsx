import React from "react";

import { FormGroup, Input, Label } from "reactstrap";
import { AsyncSelectWrap } from "components";

export const InternalBandingsForm = ({
  formData,
  handleOnChange = () => null,
}) => {
  return (
    <>
      <FormGroup>
        <Label>Title</Label>
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => handleOnChange("title", e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Position</Label>
        <AsyncSelectWrap
          name="position"
          dependencies={{ url: "/parameters", topic: "position" }}
          value={formData.position}
          onChange={(e) => handleOnChange("position", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Comments</Label>
        <Input
          type="textarea"
          value={formData.comments}
          onChange={(e) => handleOnChange("comments", e.target.value)}
          required
        />
      </FormGroup>
    </>
  );
};
