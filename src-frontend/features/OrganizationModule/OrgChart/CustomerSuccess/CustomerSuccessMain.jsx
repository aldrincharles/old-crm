import React from "react";

import { Clusters } from "common";

export const CustomerSuccessMain = ({ id }) => {
  const clusterData = [
    {
      title: "Customer Success",
      position: "customer_success",
      country: true,
    },
  ];

  return (
    <>
      {clusterData.map((data) => (
        <React.Fragment key={data.title}>
          <Clusters
            title={data.title}
            position={data.position}
            url={`/organization/org-chart/${id}/customer-success`}
            country={data.country}
          />
        </React.Fragment>
      ))}
    </>
  );
};
