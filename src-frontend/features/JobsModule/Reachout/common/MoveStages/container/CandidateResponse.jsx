import React from "react";
import { FormGroup, Input, Label, Card, CardBody } from "reactstrap";

const response_type = [
  { value: "Interested", label: "Interested" },
  { value: "Not Interested - RO", label: "Not Interested - RO" },
];

export const CandidateResponse = ({ formData, onChange = () => {} }) => {
  const { response, type } = formData;

  return (
    <>
      <Card className="mt-4">
        <CardBody>
          <FormGroup>
            <Label>Response</Label>
            <Input
              type="textarea"
              name="response"
              maxLength={10000}
              value={response}
              onChange={(e) => onChange("response", e.target.value)}
              placeholder="Write Response Here..."
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Response Type</Label>
            <Input
              name="type"
              type="select"
              value={type}
              onChange={(e) => onChange("type", e.target.value)}
              required
            >
              <option value="">Choose One</option>
              {response_type.map((option) => (
                <option key={option} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Input>
          </FormGroup>
        </CardBody>
      </Card>
    </>
  );
};
