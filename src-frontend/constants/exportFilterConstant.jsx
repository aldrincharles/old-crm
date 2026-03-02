import keyMirror from "keymirror";

export const InputType = keyMirror({
  TEXT: "text",
  NUMBER: "number",
  DATE: "date",
  SINGLE: "single",
  MULTI: "multi",
});

export const exportFilterOption = [
  { value: "name", label: "Name", type: InputType.TEXT },
  {
    value: "organization",
    label: "Organization",
    type: InputType.SINGLE,
  },
  { value: "industry", label: "Industry", type: InputType.MULTI },
  { value: "vertical", label: "Vertical", type: InputType.MULTI },
  { value: "position", label: "Position", type: InputType.MULTI },
  {
    value: "sales_specializations",
    label: "Sales Specialization",
    type: InputType.MULTI,
  },
  {
    value: "developer_specializations",
    label: "Dev Specialization",
    type: InputType.MULTI,
  },
  { value: "seniority", label: "Seniority", type: InputType.SINGLE },
  { value: "citizenship", label: "Citizenship", type: InputType.SINGLE },
  { value: "nationality", label: "Nationality", type: InputType.SINGLE },
  { value: "location", label: "Location", type: InputType.MULTI },
  { value: "geography", label: "Geography", type: InputType.SINGLE },
  { value: "year_graduated", label: "Age", type: InputType.NUMBER },
  {
    value: "years_of_total_experience",
    label: "Years of Total Experience",
    type: InputType.NUMBER,
  },
  {
    value: "years_of_tenure",
    label: "Years of Tenure",
    type: InputType.NUMBER,
  },
  {
    value: "salary_greater_than",
    label: "Salary Greater Than",
    type: InputType.NUMBER,
  },
  {
    value: "salary_less_than",
    label: "Salary Less Than",
    type: InputType.NUMBER,
  },
  {
    value: "start_date_at_least",
    label: "Start Date At Least",
    type: InputType.DATE,
  },
  {
    value: "start_date_before",
    label: "Start Date Before",
    type: InputType.DATE,
  },
  {
    value: "job_item",
    label: "Copy From Job",
    type: InputType.SINGLE,
  },
  {
    value: "organization_ranking",
    label: "Organization Ranking",
    type: InputType.SINGLE,
  },
  {
    value: "company_start_date",
    label: "Company Start Date",
    type: InputType.DATE,
  },

  {
    value: "organization",
    label: "Previous Organization",
    type: InputType.MULTI,
  },
  {
    value: "industry",
    label: "Previous Industry",
    type: InputType.MULTI,
  },
  {
    value: "location",
    label: "Previous Location",
    type: InputType.MULTI,
  },
  {
    value: "position",
    label: "Previous Position",
    type: InputType.MULTI,
  },
  {
    value: "vertical",
    label: "Previous Vertical",
    type: InputType.MULTI,
  },
  {
    value: "geography",
    label: "Previous Geography",
    type: InputType.MULTI,
  },
  {
    value: "previous_start_date",
    label: "Previous Start Date",
    type: InputType.DATE,
  },
  {
    value: "sales_specializations",
    label: "Previous Sales Specialization",
    type: InputType.MULTI,
  },
];
