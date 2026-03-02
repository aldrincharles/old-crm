import React from "react";

import { AsyncSelectWrap, SelectWrap } from "components";
import { FormGroup, Label } from "reactstrap";

const OrganizationListForm = ({ formData, onChange = () => {} }) => {
  return (
    <>
      <FormGroup>
        <Label for="Filter-Industry">Industry:</Label>
        <AsyncSelectWrap
          name="industry"
          dependencies={{ url: "/parameters", topic: "industry" }}
          value={{ label: formData?.industry, value: formData?.industry }}
          onChange={(event) => onChange("industry", event.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="Filter-Vertical">Vertical:</Label>
        <AsyncSelectWrap
          name="vertical"
          dependencies={{ url: "/parameters", topic: "vertical" }}
          value={{ label: formData?.vertical, value: formData?.vertical }}
          onChange={(event) => onChange("vertical", event.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="Filter-Industry">Solution Type :</Label>
        <SelectWrap
          name="solution_type"
          value={{
            label: formData?.solution_type,
            value: formData?.solution_type,
          }}
          onChange={(event) => onChange("solution_type", event.value)}
          options={[
            { value: "-", label: "-" },
            { value: "Single Solution", label: "Single Solution" },
            { value: "Multiple Solution", label: "Multiple Solution" },
            { value: "Complex Solution", label: "Complex Solution" },
          ]}
        />
      </FormGroup>
      <FormGroup>
        <Label for="Filter-Industry">Ranking:</Label>
        <SelectWrap
          name="ranking"
          value={{ label: formData?.ranking, value: formData?.ranking }}
          onChange={(event) => onChange("ranking", event.value)}
          options={[
            { value: "T1", label: "T1" },
            { value: "T2", label: "T2" },
            { value: "T3", label: "T3" },
            { value: "T4", label: "T4" },
            { value: "T5", label: "T5" },
            { value: "Distributors", label: "Distributors" },
            { value: "New", label: "New" },
            { value: "Not in Asia", label: "Not in Asia" },
            { value: "SI", label: "SI" },
            { value: "Consulting", label: "Consulting" },
            { value: "Strategic Consulting", label: "Strategic Consulting" },
            { value: "Big 6", label: "Big 6" },
            { value: "Indian Consulting", label: "Indian Consulting" },
            { value: "MNC", label: "MNC" },
            { value: "Niche", label: "Niche" },
            { value: "Dead Company", label: "Dead Company" },
          ]}
        />
      </FormGroup>

      <FormGroup>
        <Label for="Filter-Industry">Company Type :</Label>
        <SelectWrap
          name="company_type"
          value={{
            label: formData?.organization_internal_overview.company_type,
            value: formData?.organization_internal_overview.company_type,
          }}
          onChange={(event) =>
            onChange("organization_internal_overview", {
              company_type: event.value,
            })
          }
          options={[
            { value: "-", label: "-" },
            { value: "Private Equity", label: "Private Equity" },
            { value: "Pre-IPO", label: "Pre-IPO" },
            { value: "Listed", label: "Listed" },
            { value: "Venture Capital", label: "Venture Capital" },
            {
              value: "Acquired by Listed Company",
              label: "Acquired by Listed Company",
            },
          ]}
        />
      </FormGroup>
    </>
  );
};

export { OrganizationListForm };
