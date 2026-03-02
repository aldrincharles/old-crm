import React from "react";

import { Clusters } from "common";

export const APACManagementMain = ({ id }) => {
  const clusterData = [
    {
      title: "APAC Management",
      position: "apac_management",
    },
  ];

  return (
    <>
      {clusterData.map((data) => (
        <React.Fragment key={data.title}>
          <Clusters
            title={data.title}
            position={data.position}
            url={`/organization/org-chart/${id}/apac-management`}
          />
        </React.Fragment>
      ))}
    </>
  );
};
