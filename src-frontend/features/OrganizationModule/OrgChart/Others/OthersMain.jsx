import React from "react";

import { Clusters } from "common";

export const OthersMain = ({ id }) => {
  const clusterData = [
    {
      title: "Others",
      position: "others",
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
            url={`/organization/org-chart/${id}/others`}
            country={data.country}
          />
        </React.Fragment>
      ))}
    </>
  );
};
