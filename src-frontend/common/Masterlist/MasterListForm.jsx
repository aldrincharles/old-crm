import React from "react";
import { Label, Input, FormGroup } from "reactstrap";

import { AsyncSelectWrap } from "components";

export const MasterListForm = ({
  formData = {},
  handleOnChange = () => null,
}) => {
  return (
    <>
      <FormGroup>
        <Label>Title</Label>
        <Input
          type="text"
          maxLength={40}
          value={formData.title}
          onChange={(e) => {
            handleOnChange("title", e.target.value);
          }}
          placeholder="Write Name Here..."
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
        <Label>Industry</Label>
        <AsyncSelectWrap
          name="industry"
          dependencies={{ url: "/parameters", topic: "industry" }}
          value={formData.industry}
          onChange={(e) => handleOnChange("industry", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Location</Label>
        <AsyncSelectWrap
          name="location"
          dependencies={{ url: "/parameters", topic: "location" }}
          value={formData.location}
          onChange={(e) => handleOnChange("location", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Sales Specialization</Label>
        <AsyncSelectWrap
          name="sales_specializations"
          dependencies={{ url: "/parameters", topic: "sales_specializations" }}
          value={formData.sales_specializations}
          onChange={(e) => handleOnChange("sales_specializations", e)}
          isClearable
          isMulti
        />
      </FormGroup>
    </>
  );
};
