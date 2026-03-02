import React from "react";

import { Clusters } from "common";

export const ChannelAllianceMain = ({ id }) => {
  const clusterData = [
    {
      title: "Alliance",
      position: "alliance",
    },
    {
      title: "Channel",
      position: "channel",
    },
    {
      title: "Channel and Alliance",
      position: "channel_alliance",
    },
  ];

  return (
    <>
      {clusterData.map((data) => (
        <React.Fragment key={data.title}>
          <Clusters
            title={data.title}
            position={data.position}
            url={`/organization/org-chart/${id}/channel-alliance`}
          />
        </React.Fragment>
      ))}
    </>
  );
};
