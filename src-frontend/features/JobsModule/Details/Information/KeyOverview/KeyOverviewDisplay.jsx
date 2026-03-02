import React, { memo } from "react";

import { Table } from "reactstrap";

import { Skeleton } from "components";

const KeyOverviewDisplay = memo(({ data, isLoading = false }) => {
  const contents = [
    {
      label: "Company Overview",
      value: data?.company_overview,
    },
    {
      label: "Why making the change?",
      value: data?.why_change,
    },
    {
      label: "Target Compensation",
      value: data?.target_compensation,
    },
    {
      label: "Size of Current Team",
      value: data?.size_team,
    },
    {
      label: "Pitch/Overview of the Role",
      value: data?.position_overview,
    },
    {
      label: "Experience",
      value: data?.experience,
    },
    {
      label: "Key Attributes",
      value: data?.key_attributes,
    },
    {
      label: "Personality",
      value: data?.personality,
    },
    {
      label: "Vertical",
      value: data?.vertical_specialization,
    },
    {
      label: "Commission Targets",
      value: data?.commission_targets,
    },
  ];

  return (
    <Table bordered>
      <tbody className="white-space-display">
        {contents.map(({ label, value }) => (
          <tr key={label}>
            <td
              style={{ textAlign: "left", width: "50%" }}
              className="fw-bold bg-light"
            >
              {label}
            </td>
            <td style={{ textAlign: "justify" }}>
              {isLoading ? <Skeleton /> : value}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export { KeyOverviewDisplay };
