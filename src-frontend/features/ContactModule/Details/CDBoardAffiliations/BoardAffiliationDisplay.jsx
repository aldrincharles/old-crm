import React, { useMemo } from "react";

import { dateFormatter } from "utils";
import { AnimatedSmartTable } from "components";

export const BoardAffiliationDisplay = ({
  data,
  onSelectRows = () => null,
  onSelectedDelete = () => null,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Organization",
        accessor: "organization.label",
        disableFilters: true,
      },
      {
        Header: "Start Date",
        accessor: (data) => {
          let dt = data?.start_date
            ? dateFormatter(data.start_date, {
                month: "long",
                year: "numeric",
              })
            : "-";
          return dt;
        },
        disableFilters: true,
      },
    ],
    []
  );

  return (
    <AnimatedSmartTable
      columns={columns}
      data={data || []}
      onSelectRows={onSelectRows}
      onSelectedDelete={onSelectedDelete}
      paginated
      selectable
    />
  );
};
