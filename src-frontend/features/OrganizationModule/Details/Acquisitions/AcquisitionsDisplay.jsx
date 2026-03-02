/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";
import { currencyFormatter } from "utils";
import { SimpleTable } from "components";
import { dateFormatter } from "utils";
import { AcquisitionsEdit } from "./AcquisitionsEdit";

export const AcquisitionsDisplay = ({
  data,
  url,
  onRefetch = () => null,
  onUpdateValues = () => null,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "COMPANY NAME",
        accessor: "company_name",
      },
      {
        Header: "DATE ACQUIRED",
        accessor: (data) => {
          let dt = data.date_acquired
            ? dateFormatter(data.date_acquired, {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
            : "No Date Recorded";
          return dt;
        },
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
        Header: () => null,
        id: "AcquisitionsEdit",
        Cell: ({ row, updateMyData }) => {
          const { index, original } = row;

          const proccessKeys = (data) => {
            Object.keys(data).map((key) => {
              updateMyData(index, key, data[key]);
            });
          };

          return (
            <>
              <AcquisitionsEdit
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
