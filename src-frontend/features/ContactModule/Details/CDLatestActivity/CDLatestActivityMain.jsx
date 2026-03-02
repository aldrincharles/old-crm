import React from "react";

import { useParams } from "react-router";
import { Card, CardBody } from "reactstrap";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { CDLatestActivityDisplay } from "./CDLatestActivityDisplay";

export const CDLatestActivityMain = () => {
  const { id } = useParams();
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/contact/${id}/latest-activity`,
  });

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      <Card className="my-2">
        <h3>Latest Activity</h3>

        {isLoading && <BarLoaderSpinner />}

        <CardBody>
          <CDLatestActivityDisplay data={data} />
        </CardBody>
      </Card>
    </>
  );
};
