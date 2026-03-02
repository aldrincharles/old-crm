/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import { Table } from "reactstrap";
import { currencyFormatter } from "utils";

const EmployeeBenefitsDisplay = ({ id, data }) => {
  const contents = [
    {
      label: "Health Care Policy",
      value: data?.healthcare_policy,
    },
    {
      label: "Stock Options",
      value: data?.stock_options,
    },
    {
      label: "Holidays Count",
      value: data?.holidays_count,
    },
    {
      label: "Transport Allowance",
      value: currencyFormatter(data?.transport_allowance),
    },
  ];

  return (
    <>
      <Table bordered className="mt-2">
        <tbody>
          {contents.map((content, index) => (
            <tr key={index}>
              <td style={{ textAlign: "left", width: "20%" }}>
                {content.label}
              </td>
              <td style={{ textAlign: "left" }}>{content.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export { EmployeeBenefitsDisplay };
