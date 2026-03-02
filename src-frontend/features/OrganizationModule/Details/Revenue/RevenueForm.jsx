import React from "react";

import { FormGroup, Input, Label } from "reactstrap";

export const RevenueForm = ({ formData, handleOnChange = () => null }) => {
  return (
    <>
      <FormGroup>
        <Label>Year</Label>
        <Input
          type="number"
          value={formData.year}
          onChange={(e) => handleOnChange("year", e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Amount (USD)</Label>
        <Input
          type="number"
          value={formData.amount}
          onChange={(e) => handleOnChange("amount", e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Percentage Growth</Label>
        <Input
          type="number"
          value={formData.percentage_growth}
          onChange={(e) => handleOnChange("percentage_growth", e.target.value)}
          required
        />
      </FormGroup>
    </>
  );
};
