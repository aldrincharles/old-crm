import React from "react";

import { BarLoaderSpinner, ErrorHandler } from "components";
import { useFetch } from "hooks";

import { MatrixOverviewDisplay } from "./APJLocationsDisplay";

export const APJLocationsMain = ({ id }) => {
  const url = `/organization/asia-overview/${id}/apj-locations`;
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: url,
  });

  if (errorMessage) return <ErrorHandler onRetry={refetch} />;

  return (
    <div className="my-2">
      <h3 style={{ textAlign: "left" }}>APJ HQ and Locations</h3>

      {isLoading && <BarLoaderSpinner />}
      <MatrixOverviewDisplay data={data || []} />
    </div>
  );
};
