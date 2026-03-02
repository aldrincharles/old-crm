import React, { useMemo } from "react";

import { useFetch } from "hooks";
import { AnimatedSmartTable, BarLoaderSpinner, ErrorHandler } from "components";
import { Link } from "react-router-dom";
import { InternalInterviewList } from "features/DashboardModule/ScoreCards/InternalInterviewList";
export const InternalInterviewTable = ({ active }) => {
  const { data, errorMessage, isLoading, refetch } = useFetch({
    initialUrl: `/dashboard/tables/internal-interview`,
  });

  const columns = useMemo(
    () => [
      //   {
      //     Header: () => null,
      //     id: "organizationContacts",
      //     width: 35,
      //     Cell: ({ row }) => {
      //       return (
      //         <>
      //           <OrganizationContacts row={row} />
      //         </>
      //       );
      //     },
      //   },
      {
        Header: "Job",
        accessor: "job",
        disableSortBy: false,
        Cell: ({ row: { original } }) => {
          return <Link to={`/jobs/${original.job_id}`}>{original.job}</Link>;
        },
      },
      {
        Header: "Activation Date",
        accessor: "activation_date",
        disableSortBy: false,
        disableFilters: true,
      },
      {
        Header: "Days Active",
        accessor: "days_active",
        disableSortBy: false,
        disableFilters: true,
      },
      {
        Header: "Client",
        accessor: "client",
        disableSortBy: false,
        disableFilters: false,
      },
      {
        Header: "Screen IV Today",
        accessor: "screen_iv_today",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <InternalInterviewList
              data={row.original.screen_iv_today}
              url={`/dashboard/tables/internal-interview/screen-iv-list/${row.original.job_id}`}
            ></InternalInterviewList>
          );
        },
      },
      {
        Header: "In-Depth IV Today",
        accessor: "in_depth_today",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <InternalInterviewList
              data={row.original.in_depth_today}
              url={`/dashboard/tables/internal-interview/in-depth-iv-list/${row.original.job_id}`}
            ></InternalInterviewList>
          );
        },
      },
      {
        Header: "Total Interviewed",
        accessor: "total_interviewed",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <InternalInterviewList
              data={row.original.total_interviewed}
              url={`/dashboard/tables/internal-interview/total-interviewed/${row.original.job_id}`}
            ></InternalInterviewList>
          );
        },
      },
    ],
    []
  );

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <AnimatedSmartTable
        data={data || []}
        columns={columns}
        properties={{ height: "400px" }}
      />
    </>
  );
};
