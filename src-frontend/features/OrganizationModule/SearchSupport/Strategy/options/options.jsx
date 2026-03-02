import { InputType } from "constants";

export const categoryOptions = [
  {
    value: "industry",
    label: "Organization Industry",
    type: InputType.MULTI,
  },
  {
    value: "vertical",
    label: "Organization Vertical",
    type: InputType.MULTI,
  },
  {
    value: "industry",
    label: "Contact Industry",
    type: InputType.MULTI,
  },
  {
    value: "location",
    label: "Location",
    type: InputType.MULTI,
  },
  {
    value: "geography",
    label: "Geography",
    type: InputType.MULTI,
  },
  {
    value: "gender",
    label: "Gender",
    type: InputType.SINGLE,
  },
  {
    value: "age_group",
    label: "Age Group",
    type: InputType.SINGLE,
  },
  {
    value: "organization_name",
    label: "Organization Name",
    type: InputType.MULTI,
  },
  {
    value: "tenure",
    label: "Tenure in Role",
    type: InputType.SINGLE,
  },
  {
    value: "organization_ranking",
    label: "Organization Ranking",
    type: InputType.MULTI,
  },
  //   {
  //     value: "subcategory",
  //     label: "Subcategory Person",
  //     type: InputType.MULTI,
  //   },
  {
    value: "subcategory",
    label: "Subcategory Organization",
    type: InputType.MULTI,
  },
  {
    value: "sales_specializations",
    label: "Sales Specialization",
    type: InputType.MULTI,
  },
  {
    value: "position",
    label: "Position",
    type: InputType.MULTI,
  },
  {
    value: "position",
    label: "Previous Position",
    type: InputType.MULTI,
  },
  {
    value: "organization_name",
    label: "Previous Organization",
    type: InputType.MULTI,
  },
  {
    value: "vertical",
    label: "Previous Vertical",
    type: InputType.MULTI,
  },
  {
    value: "industry",
    label: "Previous Industry",
    type: InputType.MULTI,
  },
];

//Single = Tenure in Role / Gender / Age Group
