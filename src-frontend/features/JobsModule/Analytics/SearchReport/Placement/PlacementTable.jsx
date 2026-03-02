/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { useFetch } from "hooks";
import { AnimatedSmartTable, BarLoaderSpinner, ErrorHandler } from "components";
import { ContactInformation } from "common";
import { SelectColumnFilter } from "components/UI/Table/Addons";

export const PlacementTable = ({ id }) => {
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/analytics-report/placement-list/${id}`,
  });

  const columns = useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "table_name",
      },
      {
        Header: "ORGANIZATION",
        accessor: "table_organization",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: () => null,
        id: "contactInformation",
        width: 75,
        disableFilters: true,
        Cell: ({ row: { original } }) => {
          return (
            <ContactInformation
              modal_contact_id={original.modal_contact_id}
              shortcut_linked_in={original.shortcut_linked_in}
            />
          );
        },
      },
      {
        Header: "STATUS",
        accessor: "interview_data_id",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
    ],
    []
  );

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <AnimatedSmartTable data={data || []} columns={columns} />
    </>
  );
};
