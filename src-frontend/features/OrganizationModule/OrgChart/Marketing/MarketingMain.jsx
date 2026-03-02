import React from "react";

import { Clusters } from "common";

export const MarketingMain = ({ id }) => {
  const clusterData = [
    {
      title: "Marketing",
      position: "marketing",
    },
    {
      title: "PR",
      position: "pr",
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
            url={`/organization/org-chart/${id}/marketing`}
            country={data.country}
          />
        </React.Fragment>
      ))}
    </>
  );
};
