import React from "react";

import Skeleton from "react-loading-skeleton";

const OrganizationSummaryDisplay = ({ data, isLoading }) => {
  const content_1 = [
    { label: "Total Companies", value: data?.total_companies },
    { label: "T1", value: data?.T1 },
    { label: "T2", value: data?.T2 },
    { label: "T3", value: data?.T3 },
    { label: "T4", value: data?.T4 },
    { label: "T5", value: data?.T5 },
  ];

  const content_2 = [
    { label: "Sales", value: data?.sales },
    { label: "Pre-Sales", value: data?.pre_sales },
    { label: "Channel", value: data?.channel },
  ];

  return (
    <>
      <div>
        {content_1.map((data, index) => (
          <p
            key={index}
            className={isLoading ? null : "contact-item border-bottom"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <span className="fw-bold">{data.label}:</span>
                <span className="tx-inverse">{data.value}</span>
              </>
            )}
          </p>
        ))}
      </div>

      <div className="mt-5">
        {content_2.map((data, index) => (
          <p
            key={index}
            className={isLoading ? null : "contact-item border-bottom"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <span className="fw-bold">{data.label}:</span>
                <span className="tx-inverse">{data.value}</span>
              </>
            )}
          </p>
        ))}
      </div>
    </>
  );
};

export { OrganizationSummaryDisplay };
