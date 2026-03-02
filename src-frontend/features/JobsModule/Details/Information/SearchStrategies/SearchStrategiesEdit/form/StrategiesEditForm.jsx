import React from "react";

import { Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import DatePicker from "react-datepicker";

import { SelectWrap } from "components";
import { statusOption } from "../../options/options";

const StrategiesEditForm = ({ form, setFormData }) => {
  const updateFields = (name, event) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: event ? event : "",
      };
    });
  };

  return (
    <Card>
      <CardBody>
        <FormGroup>
          <Label>
            Status: <sup>*</sup>
          </Label>
          <SelectWrap
            name="status"
            value={form?.status}
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
                selected={form?.date_started}
                onChange={(e) => updateFields("date_started", e)}
                isClearable
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Date Finished:</Label>
              <DatePicker
                name="date_finished"
                dateFormat="MM/dd/yyyy"
                selected={form?.date_finished}
                onChange={(e) => updateFields("date_finished", e)}
                isClearable
              />
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export { StrategiesEditForm };
