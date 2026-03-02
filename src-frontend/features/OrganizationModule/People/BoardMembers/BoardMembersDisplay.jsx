import React, { useMemo } from "react";

import { AnimatedSmartTable } from "components";
import { ContactInformation } from "common";
import { dateFormatter } from "utils";

export const BoardMembersDisplay = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
      },
      {
        Header: () => null,
        id: "contactInformation",
        width: 75,
        disableFilters: true,
        Cell: ({ row: { original } }) => {
          return (
            <ContactInformation
              modal_contact_id={original.contact_id}
              shortcut_linked_in={original.linkedin}
            />
          );
        },
      },
      {
        Header: "Start Date",
        accessor: (data) => {
          let dt = data.start_date
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

  return <AnimatedSmartTable data={data || []} columns={columns} />;
};
