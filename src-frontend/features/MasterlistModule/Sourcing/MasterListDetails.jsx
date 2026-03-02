import React from "react";

import { Table, Badge } from "reactstrap";

import { dateFormatter } from "utils";

export const MasterListDetails = ({ data }) => {
  const contents = [
    {
      label: "Masterlist",
      value: data?.title,
    },
    {
      label: "Position",
      value: data?.position?.label,
    },
    {
      label: "Industry",
      value: data?.industry?.label,
    },
    {
      label: "Location",
      value: data?.location?.label,
    },
    {
      label: "Sales Specializations",
      value:
        data?.sales_specializations?.length > 0 &&
        data?.sales_specializations.map((data, index) => (
          <Badge className="me-2" color="info" key={index}>
            {data.label}
          </Badge>
        )),
    },
    {
      label: "Last Edited",
      value: data?.last_edited_date
        ? dateFormatter(data.last_edited_date, {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })
        : null,
    },
  ];

  return (
    <>
      <Table bordered style={{ tableLayout: "fixed" }}>
        <tbody>
          {contents.map((content, index) => (
            <tr key={index}>
              <td width={120}>{content.label}</td>
              <td>{content.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
