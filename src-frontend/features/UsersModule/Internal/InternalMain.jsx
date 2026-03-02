import React from "react";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";

import { InternalDisplay } from "./InternalDisplay";
import { AddInternalUsers } from "./AddInternalUsers";

export const InternalMain = () => {
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/users`,
  });

  const handleUpdate = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  if (errorMessage) return <ErrorHandler onRetry={refetch} />;

  return (
    <>
      <div style={{ textAlign: "right" }} className="mb-2">
        <AddInternalUsers onRefetch={refetch} />
      </div>

      {isLoading && <BarLoaderSpinner />}
      <InternalDisplay onUpdateValues={handleUpdate} data={data} />
    </>
  );
};
