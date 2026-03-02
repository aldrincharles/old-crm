import React from "react";

import { Card, CardBody } from "reactstrap";
import { useParams } from "react-router";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";

import { CDJobsExportedDisplay } from "./CDJobsExportedDisplay";

export const CDJobsExportedMain = () => {
  const { id } = useParams();
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/contact/${id}/jobs-exported`,
  });

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      <Card className="my-2">
        <h3>Jobs Exported</h3>

        {isLoading && <BarLoaderSpinner />}

        <CardBody>
          <CDJobsExportedDisplay data={data} />
        </CardBody>
      </Card>
    </>
  );
};
