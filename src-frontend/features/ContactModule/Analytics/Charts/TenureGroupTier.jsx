import React from "react";

import { VictoryBar, VictoryChart, VictoryGroup, VictoryLegend } from "victory";

import { useFetchTest } from "hooks";
import { ErrorHandler, Skeleton } from "components";

import { useSearchContext } from "../context/Search";

const Display = React.memo(
  ({ tier_1, tier_2, tier_3, tier_4, total, legend }) => {
    return (
      <>
        <div>
          <VictoryChart domainPadding={{ x: 20 }}>
            <VictoryLegend
              x={125}
              colorScale="qualitative"
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "black" } }}
              data={legend}
            />
            <VictoryGroup offset={10} colorScale={"qualitative"}>
              <VictoryBar data={tier_1 || []} />
              <VictoryBar data={tier_2 || []} />
              <VictoryBar data={tier_3 || []} />
              <VictoryBar data={tier_4 || []} />
            </VictoryGroup>
          </VictoryChart>
        </div>
        <p>Total: {total}</p>
      </>
    );
  }
);

const TenureGroupTier = () => {
  const state = useSearchContext();
  const { data, isLoading, error, refetch } = useFetchTest({
    initialUrl: "/contacts/analytics/tenure/ranking",
    initialParams: state?.search,
  });

  if (error) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  if (isLoading) {
    return <Skeleton count={12} />;
  }

  return <Display {...data} />;
};

export { TenureGroupTier };
