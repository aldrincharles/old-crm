/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import { Table } from "reactstrap";
import { currencyFormatter } from "utils";

const StockDetailsDisplay = ({ id, data }) => {
  const contents = [
    {
      label: "Type",
      value: data?.company_type,
    },
    {
      label: "Stock Symbol",
      value: data?.stock_symbol,
    },
    {
      label: "Stock Price",
      value: currencyFormatter(data?.stock_price),
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

export { StockDetailsDisplay };
