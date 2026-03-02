import React, { useEffect, useMemo } from "react";

import { useFetch } from "hooks";
import { ChartBar, ErrorHandler, Skeleton } from "components";
import { useSearchContext } from "../context/Search";

export const AgeGroupChart = ({ id }) => {
  const state = useSearchContext();
  const mergedState = useMemo(() => {
    return { ...state };
  }, [state]);

  const { data, isLoading, errorMessage, refetch, updateParams } = useFetch({
    initialUrl: `/analytics-report/sourcing-movement/get-age-group/${id}`,
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
          horizontal
          labels={(d) => d.y}
          data={[
            { x: "50's", y: data.fifties, fill: "#1b7ced" },
            { x: "40's", y: data.fourties, fill: "#1870d5" },
            { x: "30's", y: data.thirties, fill: "#1663be" },
            { x: "20's", y: data.twenties, fill: "#1357a6" },
          ]}
        />
      )}
    </>
  );
};
