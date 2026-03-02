import React from "react";
import { Label, Input, FormGroup, Row, Col } from "reactstrap";
import { CustomDatePicker, AsyncSelectWrap } from "components";

const CDPreviousRoleForm = ({ formData = {}, handleOnChange = () => null }) => {
  return (
    <>
      <FormGroup>
        <Label>Job Title:</Label>
        <Input
          type="text"
          maxLength={1000}
          value={formData.job_title}
          onChange={(e) => {
            handleOnChange("job_title", e.target.value);
          }}
          placeholder="Write Job title Here..."
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Organization:</Label>
        <AsyncSelectWrap
          name="organization"
          value={formData.organization}
          dependencies={{ url: "/parameters", topic: "organization" }}
          onChange={(e) => handleOnChange("organization", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Position:</Label>
        <AsyncSelectWrap
          name="position"
          value={formData.position}
          dependencies={{ url: "/parameters", topic: "position" }}
          onChange={(e) => handleOnChange("position", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Seniority:</Label>
        <AsyncSelectWrap
          name="seniority"
          value={formData.seniority}
          dependencies={{ url: "/parameters", topic: "seniority" }}
          onChange={(e) => handleOnChange("seniority", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Location:</Label>
        <AsyncSelectWrap
          name="location"
          value={formData.location}
          dependencies={{ url: "/parameters", topic: "location" }}
          onChange={(e) => handleOnChange("location", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Geography:</Label>
        <AsyncSelectWrap
          name="geography"
          value={formData.geography}
          dependencies={{ url: "/parameters", topic: "geography" }}
          onChange={(e) => handleOnChange("geography", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Industry:</Label>
        <AsyncSelectWrap
          name="industry"
          value={formData.industry}
          dependencies={{ url: "/parameters", topic: "industry" }}
          onChange={(e) => handleOnChange("industry", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Vertical:</Label>
        <AsyncSelectWrap
          name="vertical"
          value={formData.vertical}
          dependencies={{ url: "/parameters", topic: "vertical" }}
          onChange={(e) => handleOnChange("vertical", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Sales Specialization:</Label>
        <AsyncSelectWrap
          name="sales_specializations"
          value={formData.sales_specializations}
          dependencies={{ url: "/parameters", topic: "sales_specializations" }}
          onChange={(e) => handleOnChange("sales_specializations", e)}
          placeholder="Select Sales Specialization"
          isMulti
          isClearable
        />
      </FormGroup>
      <Row>
        <Col>
          <FormGroup>
            <Label>Time Frame:</Label>
            <CustomDatePicker
              selected={formData.time_frame}
              onChange={(e) => handleOnChange("time_frame", e)}
              dateFormat="MMMM yyyy"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Winners Club: </Label>
            <Input
              id="checkbox2"
              type="checkbox"
              checked={formData.winners_club}
              onChange={(e) => handleOnChange("winners_club", e)}
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

export default CDPreviousRoleForm;
