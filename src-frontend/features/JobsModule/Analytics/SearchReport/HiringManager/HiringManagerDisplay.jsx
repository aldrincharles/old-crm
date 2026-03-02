/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { useFetch } from "hooks";
import { dateFormatter } from "utils";
import { AnimatedSmartTable, ErrorHandler, BarLoaderSpinner } from "components";
import { SelectColumnFilter } from "components/UI/Table/Addons";
import { ContactInformation } from "common";

export const HiringManagerDisplay = ({ id }) => {
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/analytics-report/get-manager-interview/${id}`,
  });

  const columns = useMemo(
    () => [
      {
        Header: "INTERVIEW STAGE",
        accessor: "interview_stage",
        disableFilters: true,
      },
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "ORGANIZATION",
        accessor: "organization",
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
              modal_contact_id={original.contact_id}
              shortcut_linked_in={original.linkedin}
            />
          );
        },
      },
      {
        Header: "INTERVIEW DATE",
        accessor: (data) => {
          let dt = data.interview_date
            ? dateFormatter(data.interview_date, {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
            : "-";
          return dt;
        },
        disableFilters: true,
      },
      {
        Header: "STATUS",
        accessor: "status",
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
      <AnimatedSmartTable data={data || []} columns={columns} overflow />
    </>
  );
};
