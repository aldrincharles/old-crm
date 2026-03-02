import React, { memo } from "react";

import { Card, CardBody } from "reactstrap";

import { Skeleton } from "components";

const CDBDisplay = memo(({ data, isLoading = false }) => {
  const contents = [
    {
      label: "Name",
      value: data?.name,
    },
    {
      label: "Position",
      value: data?.position,
    },
    {
      label: "Linked In",
      value: (
        <a href={data?.linkedin} target="_blank" rel="noreferrer">
          {data?.linkedin}
        </a>
      ),
    },
    {
      label: "Email",
      value: data?.email,
    },
    {
      label: "Mobile Number",
      value: data?.mobile_number,
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

export { CDBDisplay };
