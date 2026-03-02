import React from "react";

import { Col, FormGroup, Label, Row } from "reactstrap";
import { useParams } from "react-router";
import DatePicker from "react-datepicker";

import { AsyncSelectWrap, SelectWrap } from "components";

import { statusOption } from "../../options/options";

const TemplateForm = ({ formData, updateFields }) => {
  const { id } = useParams();

  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <Label>
              Strategy: <sup>*</sup>
            </Label>
            <AsyncSelectWrap
              name="organization_strategy"
              dependencies={{
                url: "/parameters",
                topic: "organization_strategy",
                id: id,
              }}
              value={formData?.organization_strategy || ""}
              onChange={(e) => updateFields("organization_strategy", e)}
              required
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>
              Status: <sup>*</sup>
            </Label>
            <SelectWrap
              name="status"
              value={formData?.status || ""}
              options={statusOption}
              onChange={(e) => updateFields("status", e)}
              required
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <FormGroup>
            <Label>Date Started:</Label>
            <DatePicker
              name="date_started"
              dateFormat="MM/dd/yyyy"
              selected={formData?.date_started || null}
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
              selected={formData?.date_finished || null}
              onChange={(e) => updateFields("date_finished", e)}
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

export { TemplateForm };
