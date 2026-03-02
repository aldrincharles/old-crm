import React from "react";

import { Clusters } from "common";

export const HRRecruitmentMain = ({ id }) => {
  const clusterData = [
    {
      title: "HR",
      position: "hr",
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
            url={`/organization/org-chart/${id}/hr-recruitment`}
            country={data.country}
          />
        </React.Fragment>
      ))}
    </>
  );
};
