import React, { useEffect, useMemo } from "react";
import { useFetch } from "hooks";
import { ChartBar, ErrorHandler, Skeleton } from "components";
import { useSearchContext } from "../context/Search";

export const TenureChart = ({ id }) => {
  const state = useSearchContext();
  const mergedState = useMemo(() => {
    return { ...state };
  }, [state]);
  const { data, isLoading, errorMessage, refetch, updateParams } = useFetch({
    initialUrl: `/analytics-report/sourcing-movement/tenure/${id}`,
    initialParams: mergedState,
  });
  useEffect(() => {
    updateParams(mergedState);
  }, [mergedState, updateParams]);
  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  if (isLoading) {
    return <Skeleton count={12} />;
  }

  return (
    <>
      {data && (
        <ChartBar
          vertical
          labels={(d) => d.y}
          data={[
            { x: "> 36", y: data.above_36, fill: "#1b7ced" },
            { x: "24~36", y: data.range_24_36, fill: "#1870d5" },
            { x: "18~23", y: data.range_18_23, fill: "#1663be" },
            { x: "< 18", y: data.below_18, fill: "#1357a6" },
          ]}
        />
      )}
    </>
  );
};
