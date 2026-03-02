import "./style/formStyle.css";

import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import DatePicker from "react-datepicker";

import { FormWrapper } from "../../common/FormWrapper";
import { AsyncSelectWrap, SelectWrap } from "components";
import { raasItel } from "constants";
import { jobClassification, jobStatus } from "constants";

export function SearchActivationForm({
  status,
  search_number,
  search_category,
  organization,
  activation_date,
  position_count,
  location,
  geographic_coverage,
  client_interview_stages_count,
  replacement,
  classification,
  updateFields,
}) {
  return (
    <FormWrapper>
      <FormGroup>
        <Label>Job Status:</Label>
        <SelectWrap
          name="status"
          value={status}
          options={jobStatus}
          onChange={(e) => updateFields("status", e)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Search Number:</Label>
        <Input
          type="number"
          name="search_number"
          value={search_number}
          onChange={(e) => updateFields("search_number", e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>RaaS or ITEL?:</Label>
        <SelectWrap
          name="search_category"
          value={search_category}
          options={raasItel}
          onChange={(e) => updateFields("search_category", e)}
        />
      </FormGroup>

      <FormGroup>
        <Label>
          Classification: <sup>*</sup>
        </Label>
        <SelectWrap
          name="classification"
          value={classification}
          onChange={(e) => updateFields("classification", e)}
          options={jobClassification}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>
          Company: <sup>*</sup>
        </Label>
        <AsyncSelectWrap
          name="organization"
          dependencies={{ url: "/parameters", topic: "organization" }}
          value={organization || ""}
          onChange={(event) => updateFields("organization", event)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Position Count:</Label>
        <Input
          type="number"
          name="position_count"
          value={position_count}
          onChange={(e) => updateFields("position_count", e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Location:</Label>
        <Input
          type="text"
          name="location"
          value={location}
          onChange={(e) => updateFields("location", e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label>Geographic Coverage:</Label>
        <Input
          type="text"
          name="geographic_coverage"
          value={geographic_coverage}
          onChange={(e) => updateFields("geographic_coverage", e.target.value)}
        ></Input>
      </FormGroup>

      <FormGroup>
        <Label>
          Number of Client Interview Stages (Excluding Panel and further
          stages): <sup>*</sup>
        </Label>
        <Input
          type="number"
          name="client_interview_stages_count"
          value={client_interview_stages_count}
          min={1}
          max={10}
          onChange={(e) =>
            updateFields("client_interview_stages_count", e.target.value)
          }
          required
        ></Input>
      </FormGroup>

      <FormGroup tag="fieldset">
        <Row className="pl-3">
          <Col sm="auto">
            <FormGroup check>
              <Input
                id="radio1-option1"
                type="radio"
                name="radio1"
                value="New Position"
                checked={replacement === "New Position"}
                onChange={(e) => updateFields("replacement", e.target.value)}
              />
              <Label check for="radio1-option1">
                New Position
              </Label>
            </FormGroup>
          </Col>
          <Col sm="auto">
            <FormGroup>
              <Input
                id="radio1-option2"
                type="radio"
                name="radio1"
                value="Replacement"
                checked={replacement === "Replacement"}
                onChange={(e) => updateFields("replacement", e.target.value)}
              />
              <Label check for="radio1-option2">
                Replacement
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>

      <FormGroup>
        <Label>Activation Date:</Label>
        <DatePicker
          name="activation_date"
          dateFormat="MM/dd/yyyy"
          selected={activation_date}
          onChange={(e) => updateFields("activation_date", e)}
        />
      </FormGroup>
    </FormWrapper>
  );
}
