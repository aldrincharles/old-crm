import React from "react";

import { useParams } from "react-router";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { SLADisplay } from "./SLADisplay";
import { SLAEdit } from "./SLAEdit";

const SLAMain = () => {
  const { id } = useParams();
  const { data, setData, refetch, isLoading, errorMessage } = useFetch({
    initialUrl: `/jobs/${id}/details/sla`,
  });

  const onSubmit = (value) => {
    setData({ ...data, ...value });
  };

  if (errorMessage) return <ErrorHandler onRetry={refetch} />;

  return (
    <div
    // style={{
    //   display: "flex",
    //   minHeight: `50vh`,
    //   alignItems: "center",
    //   justifyContent: "center",
    // }}
    >
      <div>
        <div style={{ textAlign: "right" }} className="mb-2">
          {data && <SLAEdit data={data} onSubmit={onSubmit} />}
        </div>

        {isLoading && <BarLoaderSpinner />}
        <SLADisplay data={data} />
      </div>
    </div>
  );
};

export { SLAMain };
