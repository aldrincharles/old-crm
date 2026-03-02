import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "hooks";
import { AnimatedSmartTable, BarLoaderSpinner, ErrorHandler } from "components";
import { ItelRejectedList } from "./ItelRejectedList";
import { ClientRejectedList } from "./ClientRejectedList";
import { CandidateRejectedList } from "./CandidateRejectedList";
// import { CandidateRejectedList } from "./CandidateRejectedList";

export const RejectedTable = ({ active }) => {
  const { data, errorMessage, isLoading, refetch } = useFetch({
    initialUrl: `/dashboard/tables/rejected`,
  });

  const columns = useMemo(
    () => [
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
        Header: "ITEL Rejected",
        accessor: "itel_rejected",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <ItelRejectedList
              data={row.original.itel_rejected}
              url={`/dashboard/tables/rejected/${row.original.job_id}/itel-rejected`}
            ></ItelRejectedList>
          );
        },
      },
      {
        Header: "CLIENT Rejected",
        accessor: "client_rejected",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <ClientRejectedList
              data={row.original.client_rejected}
              url={`/dashboard/tables/rejected/${row.original.job_id}/client-rejected`}
            ></ClientRejectedList>
          );
        },
      },
      {
        Header: "CANDIDATE Rejected",
        accessor: "candidate_rejected",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <CandidateRejectedList
              data={row.original.candidate_rejected}
              url={`/dashboard/tables/rejected/${row.original.job_id}/candidate-rejected`}
            ></CandidateRejectedList>
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
