import React, { memo } from "react";

import { Card, CardBody } from "reactstrap";

import { Skeleton } from "components";
import { badgeStatus } from "constants";
import { dateFormatter } from "utils";

const BasicDisplay = memo(({ data, isLoading = false }) => {
  const contents = [
    {
      label: "Search Number",
      value: data?.search_number,
    },
    {
      label: "Search Status",
      value: (
        <>
          <i className={`${badgeStatus[data?.status?.value]} me-2`} />
          {data?.status?.label}
        </>
      ),
    },
    {
      label: "RaaS or ITEL?",
      value: data?.search_category?.label,
    },
    {
      label: "Classification",
      value: data?.classification?.label,
    },
    {
      label: "Company",
      value: data?.organization?.label,
    },
    {
      label: "Activation Date",
      value: data?.activation_date
        ? dateFormatter(
            data.activation_date,
            // "YYYY-MM-DD"
            {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }
          )
        : null,
    },
    {
      label: "Position Count",
      value: data?.position_count,
    },
    {
      label: "Location",
      value: data?.location,
    },
    {
      label: "Geographic Coverage",
      value: data?.geographic_coverage,
    },
    {
      label: "New Position/Replacement",
      value: data?.replacement,
    },
    {
      label: "Number of Client Interviews",
      value: data?.client_interview_stages_count,
    },
  ];

  return (
    <Card>
      <CardBody>
        {contents.map(({ label, value }) => (
          <p
            key={label}
            className={isLoading ? null : "contact-item border-bottom"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <span className="fw-bold">{label}: </span>
                <span>{value}</span>
              </>
            )}
          </p>
        ))}
      </CardBody>
    </Card>
  );
});

export { BasicDisplay };
