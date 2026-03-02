import React from "react";

import { FormGroup, Input, Label } from "reactstrap";
import DatePicker from "react-datepicker";

export const AcquisitionsForm = ({ formData, handleOnChange = () => null }) => {
  return (
    <>
      <FormGroup>
        <Label>Company Name</Label>
        <Input
          type="text"
          value={formData.company_name}
          onChange={(e) => handleOnChange("company_name", e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Amount</Label>
        <Input
          type="number"
          value={formData.amount}
          onChange={(e) => handleOnChange("amount", e.target.value)}
          required
        />
      </FormGroup>
      <Label>DATE ACQUIRED</Label>
      <div>
        <DatePicker
          selected={formData.date_acquired}
          onChange={(date) => handleOnChange("date_acquired", date)}
        />
      </div>
    </>
  );
};
