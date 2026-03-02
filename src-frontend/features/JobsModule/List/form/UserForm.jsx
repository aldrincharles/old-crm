import "./style/formStyle.css";

import { AsyncSelectWrap, SelectWrap } from "components";
import { jobClassification } from "constants";
import { FormGroup, Input, Label } from "reactstrap";

// import { FormWrapper } from "./base/FormWrapper";

export function UserForm({
  title,
  organization,
  classification,
  updateFields,
  // errors
}) {
  return (
    <>
      <FormGroup>
        <Label>
          Search Title: <sup>*</sup>
        </Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => updateFields("title", e.target.value)}
          // invalid={errors?.title && true}
          required
        />
        {/* {errors?.title && <span className="text-danger">{errors?.title}</span>} */}
      </FormGroup>
      <FormGroup>
        <Label>
          Organization: <sup>*</sup>
        </Label>
        <AsyncSelectWrap
          name="organization"
          dependencies={{ url: "/parameters", topic: "organization" }}
          value={organization}
          onChange={(e) => updateFields("organization", e)}
          required
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
    </>
  );
}
