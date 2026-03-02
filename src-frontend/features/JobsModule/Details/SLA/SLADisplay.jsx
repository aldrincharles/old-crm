import React from "react";

import { Table } from "reactstrap";

import { dateFormatter } from "utils";

const convertDateFormat = (date) => {
  return date
    ? dateFormatter(date, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "N/A";
};

export const SLADisplay = ({ data }) => {
  const content = [
    {
      label: "Sourcing",
      value: data?.sla_sourcing,
      stages: "Per strategy",
      startDate: convertDateFormat(data?.sla_sourcing_date),
      endDate: convertDateFormat(data?.sla_sourcing_date_end),
    },
    {
      label: "Screening",
      value: data?.sla_screening,
      stages: "After Verification",
      startDate: convertDateFormat(data?.sla_screening_date),
      endDate: convertDateFormat(data?.sla_screening_date_end),
    },
    {
      label: "Candidate Forwarded",
      value: data?.sla_candidate_forwarded,
      stages: "After First Screen",
      startDate: convertDateFormat(data?.sla_candidate_forwarded_date),
      endDate: convertDateFormat(data?.sla_candidate_forwarded_date_end),
    },
    {
      label: "Hiring Manager Interview",
      value: data?.sla_hiring_manager_interview,
      stages: "After First Screen",
      startDate: convertDateFormat(data?.sla_hiring_manager_interview_date),
      endDate: convertDateFormat(data?.sla_hiring_manager_interview_date_end),
    },
    {
      label: "Offer",
      value: data?.sla_offer,
      stages: "After Final interview",
      startDate: convertDateFormat(data?.sla_placement_date),
      endDate: convertDateFormat(data?.sla_placement_date_end),
    },
    {
      label: "Reach Out",
      value: data?.sla_reach_out,
      stages: "After Verification",
      color: "Grey",
    },
  ];

  return (
    <>
      <Table borderless>
        <thead>
          <tr>
            <th>SLA</th>
            <th>DAYS TILL OVERDUE</th>
            <th></th>
            <th>DATE STARTED</th>
            <th>DATE ENDED</th>
          </tr>
        </thead>
        <tbody>
          {content.map(
            ({ label, value, stages, startDate, endDate, color }) => (
              <tr key={label}>
                <td>{label}</td>
                <td>{value}</td>
                <td>{stages}</td>
                <td style={{ background: color }}>{startDate}</td>
                <td style={{ background: color }}>{endDate}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
};
