import React from "react";

import { FormGroup, Input, Label } from "reactstrap";
import { SelectWrap, AsyncSelectWrap } from "components";
import { months } from "constants";

export const OrganizationDetailsForm = ({
  formData,
  handleOnChange = () => null,
}) => {
  return (
    <>
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => handleOnChange("name", e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Ranking</Label>
        <SelectWrap
          name="ranking"
          value={formData.ranking}
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
          onChange={(e) => handleOnChange("ranking", e)}
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
        <Label>Vertical</Label>
        <AsyncSelectWrap
          name="vertical"
          dependencies={{ url: "/parameters", topic: "vertical" }}
          value={formData.vertical}
          onChange={(e) => handleOnChange("vertical", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="Filter-Industry">Solution Type :</Label>
        <SelectWrap
          name="solution_type"
          value={formData.solution_type}
          onChange={(e) => handleOnChange("solution_type", e)}
          options={[
            { value: "-", label: "-" },
            { value: "Single Solution", label: "Single Solution" },
            { value: "Multiple Solution", label: "Multiple Solution" },
            { value: "Complex Solution", label: "Complex Solution" },
          ]}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Classification</Label>
        <SelectWrap
          name="classification"
          value={formData.classification}
          options={[
            { value: "-", label: "-" },
            { value: "Large MNC", label: "Large MNC" },
            { value: "Rest of Top 200", label: "Rest of Top 200" },
            { value: "Hyperscale", label: "Hyperscale" },
            { value: "Future Hyperscale", label: "Future Hyperscale" },
            { value: "ANZ to APAC Scalers", label: "ANZ to APAC Scalers" },
            { value: "APAC Scalers", label: "APAC Scalers" },
            { value: "Asian Company", label: "Asian Company" },
            { value: "Asian Start-up", label: "Asian Start-up" },
            {
              value: "Stand Alone - Acquired",
              label: "Stand Alone - Acquired",
            },
            {
              value: "Acquired",
              label: "Acquired",
            },
            {
              value: "Unicorn",
              label: "Unicorn",
            },
            {
              value: "Dead Company",
              label: "Dead Company",
            },
          ]}
          onChange={(e) => handleOnChange("classification", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Client</Label>
        <SelectWrap
          name="client"
          value={formData.client}
          options={[
            { value: "-", label: "-" },
            { value: "ITEL", label: "ITEL" },
            { value: "RaaS", label: "RaaS" },
            { value: "Potential Client", label: "Potential Client" },
          ]}
          onChange={(e) => handleOnChange("client", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Website</Label>
        <Input
          type="text"
          value={formData.website}
          onChange={(e) => handleOnChange("website", e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Global Employee Size</Label>
        <Input
          type="number"
          placeholder="1"
          min={1}
          value={formData.global_employee_size}
          onChange={(e) =>
            handleOnChange("global_employee_size", e.target.value)
          }
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Global HQ</Label>
        <AsyncSelectWrap
          name="global_hq"
          dependencies={{ url: "/parameters", topic: "location" }}
          value={formData.global_hq}
          onChange={(e) => handleOnChange("global_hq", e)}
          isClearable
        />
      </FormGroup>
      <FormGroup>
        <Label>Local Company</Label>
        <SelectWrap
          name="local_company"
          value={formData.local_company}
          options={[
            { value: 1, label: "Yes" },
            { value: 0, label: "No" },
          ]}
          onChange={(e) => handleOnChange("local_company", e)}
          isClearable
        />
      </FormGroup>
      <FormGroup>
        <Label>APAC HQ</Label>
        <AsyncSelectWrap
          name="apac_hq"
          dependencies={{ url: "/parameters", topic: "location" }}
          value={formData.apac_hq}
          onChange={(e) => handleOnChange("apac_hq", e)}
          isClearable
        />
      </FormGroup>
      <FormGroup>
        <Label>APAC Offices</Label>
        <AsyncSelectWrap
          name="apac_offices"
          dependencies={{ url: "/parameters", topic: "location" }}
          value={formData.apac_offices}
          onChange={(e) => handleOnChange("apac_offices", e)}
          required
          isMulti
        />
      </FormGroup>
      <FormGroup>
        <Label>Fiscal Year Start</Label>
        <SelectWrap
          name="fiscal_start"
          value={formData.fiscal_start}
          options={months}
          onChange={(e) => handleOnChange("fiscal_start", e)}
        />
      </FormGroup>
    </>
  );
};
