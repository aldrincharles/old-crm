import React from "react";

import { Card } from "reactstrap";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";

export const RoleOverview = ({ id }) => {
  const { data, errorMessage, isLoading, refetch } = useFetch({
    initialUrl: `jobs/${id}/details/outline/role-overview`,
  });
  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      <h3 className="my-2">Role Overview</h3>
      <Card>
        {isLoading && <BarLoaderSpinner />}
        <p>{data}</p>
      </Card>
    </>
  );
};
