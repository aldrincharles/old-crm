/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { SimpleTable } from "components";

export const MatrixOverviewDisplay = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "LOCATION",
        accessor: "location",
      },
      {
        Header: "SALES",
        accessor: "sales",
      },
      {
        Header: "PRE-SALES",
        accessor: "pre_sales",
      },
      {
        Header: "CHANNEL",
        accessor: "channel",
      },
    ],
    []
  );

  return (
    <SimpleTable
      data={data}
      columns={columns}
      properties={{ height: "auto" }}
    />
  );
};
