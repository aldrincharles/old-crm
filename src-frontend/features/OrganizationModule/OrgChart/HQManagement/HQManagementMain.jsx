import React from "react";

import { Clusters } from "common";
export const HQManagementMain = ({ id }) => {
  const clusterData = [
    {
      title: "HQ Management",
      position: "hq_management",
    },
  ];

  return (
    <>
      {clusterData.map((data) => (
        <React.Fragment key={data.title}>
          <Clusters
            title={data.title}
            position={data.position}
            url={`/organization/org-chart/${id}/hq-management`}
          />
        </React.Fragment>
      ))}
    </>
  );
};
