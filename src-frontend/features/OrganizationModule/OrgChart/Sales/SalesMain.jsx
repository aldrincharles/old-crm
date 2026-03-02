import React from "react";

import { Clusters } from "common";

export const SalesMain = ({ id }) => {
  const clusterData = [
    {
      title: "VP Sales",
      position: "vp_sales",
    },
    {
      title: "Regional Leader",
      position: "regional_leader",
    },
    {
      title: "Sales Director",
      position: "sales_director",
    },
    {
      title: "Country Manager",
      position: "country_manager",
    },
    {
      title: "Sales Manager",
      position: "sales_manager",
    },
    {
      title: "Vertical Leader",
      position: "vertical_leader",
    },
    {
      title: "Segment Leader",
      position: "segment_leader",
    },
    {
      title: "Business Development",
      position: "business_development",
    },
    {
      title: "GAM",
      position: "gam",
    },
    {
      title: "Named Accounts",
      position: "named_accounts",
    },
    {
      title: "Inside Sales",
      position: "inside_sales",
    },
    {
      title: "Renewal Sales",
      position: "renewal_sales",
    },
    {
      title: "Lead Gen",
      position: "lead_gen",
    },
    {
      title: "IC",
      position: "ic",
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
            url={`/organization/org-chart/${id}/sales`}
            country={data.country}
          />
        </React.Fragment>
      ))}
    </>
  );
};
