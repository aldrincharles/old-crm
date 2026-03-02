import React from "react";

import { VictoryBar, VictoryChart } from "victory";

import { useFetchTest } from "hooks";
import { ErrorHandler, Skeleton } from "components";

import { useSearchContext } from "../context/Search";

const Display = React.memo(({ industry, total }) => {
  return (
    <>
      <VictoryChart
        domainPadding={{ x: 5, y: 30 }}
        padding={{ left: 120 }}
        horizontal
      >
        <VictoryBar
          labels={({ datum }) => datum.y}
          style={{
            data: { fill: ({ datum }) => datum.fill },
          }}
          data={industry}
        />
      </VictoryChart>
      <p>Total: {total}</p>
    </>
  );
});

const IndustryPopulation = () => {
  const state = useSearchContext();
  const { data, isLoading, error, refetch } = useFetchTest({
    initialUrl: "/contacts/analytics/industry",
    initialParams: state?.search,
  });

  if (error) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  if (isLoading) {
    return <Skeleton count={12} />;
  }

  return <Display {...data} />;
};

export { IndustryPopulation };
