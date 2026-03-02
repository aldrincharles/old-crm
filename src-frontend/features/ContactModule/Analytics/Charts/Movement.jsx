import React from "react";

import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

import { useFetchTest } from "hooks";
import { ErrorHandler, Skeleton } from "components";

import { useSearchContext } from "../context/Search";

const Display = React.memo(({ data, total }) => {
  return (
    <>
      <VictoryChart
        theme={VictoryTheme.material}
        // domainPadding={{ x: 5, y: 30 }}›
        // padding={{ left: 75, bottom: 50 }}
      >
        <VictoryLine
          style={{
            data: { stroke: "#0f264a" },
            parent: { border: "1px solid #ccc" },
          }}
          data={data}
        />
      </VictoryChart>
      <p>Total: {total}</p>
    </>
  );
});

const Movement = () => {
  const state = useSearchContext();
  const { data, isLoading, error, refetch } = useFetchTest({
    initialUrl: "/contacts/analytics/contacts-movement",
    initialParams: state?.search,
  });

  if (error) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  if (isLoading) {
    return <Skeleton count={12} />;
  }

  return <Display data={data || []} total={data?.total} />;
};

export { Movement };
