/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { SimpleTable } from "components";
import { InternalBandingsEdit } from "./InternalBandingsEdit";

export const InternalBandingsDisplay = ({
  data,
  url,
  onRefetch = () => null,
  onUpdateValues = () => null,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "TITLE",
        accessor: "title",
      },
      {
        Header: "POSITION",
        accessor: "position.label",
      },

      {
        Header: "COMMENTS",
        accessor: "comments",
      },
      {
        Header: () => null,
        id: "InternalBandingsEdit",
        Cell: ({ row, updateMyData }) => {
          const { index, original } = row;

          const proccessKeys = (data) => {
            Object.keys(data).map((key) => {
              updateMyData(index, key, data[key]);
            });
          };

          return (
            <>
              <InternalBandingsEdit
                data={original}
                url={url}
                onProcessKeys={proccessKeys}
                onRefetch={onRefetch}
              />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <SimpleTable
        data={data || []}
        columns={columns}
        properties={{ height: 400 }}
        updateMyData={onUpdateValues}
      />
    </>
  );
};
