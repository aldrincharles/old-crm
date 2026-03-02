import React from "react";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";

import { AddClientUser } from "./AddClientUser";
import { ClientUserDisplay } from "./ClientUserDisplay";

export const ClientUserMain = () => {
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/external-users`,
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
        <AddClientUser onRefetch={refetch} />
      </div>

      {isLoading && <BarLoaderSpinner />}
      <ClientUserDisplay
        data={data}
        onUpdateValues={handleUpdate}
        onRefetch={refetch}
      />
    </>
  );
};
