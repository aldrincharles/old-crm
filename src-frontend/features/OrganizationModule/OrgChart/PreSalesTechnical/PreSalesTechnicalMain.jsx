import React from "react";

import { Clusters } from "common";

export const PreSalesTechnicalMain = ({ id }) => {
  const clusterData = [
    {
      title: "Pre Sales",
      position: "presales",
    },
    {
      title: "Technical",
      position: "technical",
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
            url={`/organization/org-chart/${id}/presales-technical`}
            country={data.country}
          />
        </React.Fragment>
      ))}
    </>
  );
};
