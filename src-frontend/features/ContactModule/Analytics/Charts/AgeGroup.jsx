import React from "react";

import { VictoryBar, VictoryChart, VictoryLabel } from "victory";

import { useFetchTest } from "hooks";
import { useSearchContext } from "../context/Search";
import { ErrorHandler, Skeleton } from "components";

const Display = React.memo(({ age_group, total }) => {
  return (
    <>
      <VictoryChart domainPadding={{ x: 35 }}>
        <VictoryBar
          barRatio={0.8}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel />}
          style={{
            data: { fill: ({ datum }) => datum.fill },
          }}
          data={age_group || []}
        />
      </VictoryChart>
      <p>Total: {total}</p>
    </>
  );
});

const AgeGroup = () => {
  const state = useSearchContext();
  const { data, isLoading, error, refetch } = useFetchTest({
    initialUrl: `/contacts/analytics/age-group`,
    initialParams: state?.search,
  });

  if (error) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  if (isLoading) {
    return <Skeleton count={12} />;
  }

  return <Display {...data} />;
};

export { AgeGroup };
