import React, { useEffect, useMemo } from "react";
import { Card } from "reactstrap";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { useSearchContext } from "../context/Search";

const NewHire = ({ id }) => {
  const state = useSearchContext();
  const mergedState = useMemo(() => {
    return { ...state };
  }, [state]);
  const { data, isLoading, errorMessage, refetch, updateParams } = useFetch({
    initialUrl: `/analytics-report/sourcing-movement/new-hires/${id}`,
    initialParams: mergedState,
  });

  useEffect(() => {
    updateParams(mergedState);
  }, [mergedState, updateParams]);
  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <Card
        style={{
          display: "flex",
          minHeight: `25vh`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "125px" }}>{data?.total || "0"}</span>
      </Card>
    </>
  );
};

export { NewHire };
