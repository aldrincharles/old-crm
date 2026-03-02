import { Skeleton } from "components";
import React from "react";

export const CDSalaryDisplay = ({ data, isLoading = true }) => {
  const contents = [
    {
      name: "Currency",
      content: data?.currency,
    },
    {
      name: "Annual Base Salary",
      content: data?.annual_base_salary,
    },
    {
      name: "Annual Commision / Incentive",
      content: data?.annual_commission,
    },
    {
      name: "OTE Split",
      content: data?.ote_split,
    },
    {
      name: "Travel Allowance",
      content: data?.travel_allowance,
    },
    {
      name: "RSU / Stock Options",
      content: data?.rsu_stock,
    },
    {
      name: "Annual Leave",
      content: data?.annual_leave,
    },
    {
      name: "Notice Period",
      content: data?.notice_period,
    },
  ];

  return (
    <>
      {contents.map((c, i) => (
        <p key={i} className={isLoading ? null : "contact-item border-bottom"}>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <span className="fw-bold">{c.name}: </span>
              <span> {c.content}</span>
            </>
          )}
        </p>
      ))}
    </>
  );
};
