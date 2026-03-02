import React, { useMemo } from "react";

import { useFetch } from "hooks";
import { AnimatedSmartTable, BarLoaderSpinner, ErrorHandler } from "components";
import { ROContactsList } from "./ROContactsList";
import { Link } from "react-router-dom";

export const ReachOutTable = ({ active }) => {
  const { data, errorMessage, isLoading, refetch } = useFetch({
    initialUrl: `/dashboard/tables/reach-out`,
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
        Header: "Total Previous Day RO (INMAIL)",
        accessor: "previous_day_inmail",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <ROContactsList
              data={row.original.previous_day_inmail}
              url={`/dashboard/previous-day-ro/in-mail/${row.original.job_id}`}
            ></ROContactsList>
          );
        },
      },
      {
        Header: "Total Previous Day RO (RECRUITER)",
        accessor: "previous_day_recruiter",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <ROContactsList
              data={row.original.previous_day_recruiter}
              url={`/dashboard/previous-day-ro/recruiter/${row.original.job_id}`}
            ></ROContactsList>
          );
        },
      },
      {
        Header: "Total RO Overall",
        accessor: "total_ro",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <ROContactsList
              data={row.original.total_ro}
              url={`/dashboard/total-reach-out/${row.original.job_id}`}
            ></ROContactsList>
          );
        },
      },
      {
        Header: "Previous Day Conn. Campaign",
        accessor: "previous_day_conn_campaign",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <ROContactsList
              data={row.original.previous_day_conn_campaign}
              url={`/dashboard/connection-campaigns/previous-day/${row.original.job_id}`}
            ></ROContactsList>
          );
        },
      },
      {
        Header: "Connection Campaigns Sent",
        accessor: "conn_campaign_sent",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <ROContactsList
              data={row.original.conn_campaign_sent}
              url={`/dashboard/connection-campaigns/${row.original.job_id}`}
            ></ROContactsList>
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
