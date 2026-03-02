import "./style/formStyle.css";
import React from "react";

import DatePicker from "react-datepicker";
import { SelectWrap } from "components";

import { Col, FormGroup, Input, Label, Row } from "reactstrap";

import { statusOption } from "../../options/options";

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

      <FormGroup>
        <Label>
          Status: <sup>*</sup>
        </Label>
        <SelectWrap
          name="status"
          value={info?.status || ""}
          options={statusOption}
          onChange={(e) => updateFields("status", e)}
          required
        />
      </FormGroup>

      <Row>
        <Col>
          <FormGroup>
            <Label>Date Started:</Label>
            <DatePicker
              name="date_started"
              dateFormat="MM/dd/yyyy"
              selected={info?.date_started || null}
              onChange={(e) => updateFields("date_started", e)}
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label>Date Finished:</Label>
            <DatePicker
              name="date_finished"
              dateFormat="MM/dd/yyyy"
              selected={info?.date_finished || null}
              onChange={(e) => updateFields("date_finished", e)}
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

export { BasicInfoForm };
