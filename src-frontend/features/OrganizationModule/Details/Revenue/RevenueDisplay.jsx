/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { SimpleTable } from "components";
import { currencyFormatter } from "utils";
import { RevenueEdit } from "./RevenueEdit";

export const RevenueDisplay = ({
  data,
  url,
  onRefetch = () => null,
  onUpdateValues = () => null,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "YEAR",
        accessor: "year",
      },
      {
        Header: "AMOUNT",
        accessor: "amount",
        Cell: ({ row: { original } }) => {
          const amount = original?.amount
            ? currencyFormatter(original.amount)
            : null;
          return <text>{amount}</text>;
        },
      },
      {
        Header: "PERCENTAGE GROWTH",
        accessor: "percentage_growth",
        Cell: ({ row: { original } }) => {
          return <>{original.percentage_growth}%</>;
        },
      },
      {
        Header: () => null,
        id: "RevenueEdit",
        Cell: ({ row, updateMyData }) => {
          const { index, original } = row;

          const proccessKeys = (data) => {
            Object.keys(data).map((key) => {
              updateMyData(index, key, data[key]);
            });
          };

          return (
            <>
              <RevenueEdit
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
    <SimpleTable
      data={data || []}
      columns={columns}
      properties={{ height: 400 }}
      updateMyData={onUpdateValues}
    />
  );
};
