import React from "react";

import { Clusters } from "common";

export const ProfessionalServicesMain = ({ id }) => {
  const clusterData = [
    {
      title: "Professional Services",
      position: "professional_services",
      country: true,
    },
    {
      title: "Delivery",
      position: "delivery",
      country: true,
    },
    {
      title: "Support",
      position: "support",
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
            url={`/organization/org-chart/${id}/professional-services`}
            country={data.country}
          />
        </React.Fragment>
      ))}
    </>
  );
};
