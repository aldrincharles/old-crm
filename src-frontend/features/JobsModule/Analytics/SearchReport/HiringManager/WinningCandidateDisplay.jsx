/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { useFetch } from "hooks";
import { AnimatedSmartTable, BarLoaderSpinner, ErrorHandler } from "components";
import { SelectColumnFilter } from "components/UI/Table/Addons";
import { ContactInformation } from "common";

export const WinningCandidateDisplay = ({ id }) => {
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/analytics-report/get-winning-candidates/${id}`,
  });

  const columns = useMemo(
    () => [
      {
        Header: "WINNING CANDIDATE",
        columns: [
          {
            Header: "NAME",
            accessor: "name",
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
            Header: "OFFER",
            accessor: "offer",
            disableFilters: true,
          },
          {
            Header: "STATUS",
            accessor: "status",
            Filter: SelectColumnFilter,
            filter: "equals",
          },
        ],
      },
    ],
    []
  );

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <AnimatedSmartTable data={data || []} columns={columns} overflow />
    </>
  );
};
