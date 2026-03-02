import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "hooks";
import { AnimatedSmartTable, BarLoaderSpinner, ErrorHandler } from "components";
import { InProcessContactsList } from "./InProcessContactsList";
import { ForOfferList } from "./ForOfferList";
import { PlacementList } from "./PlacementList";
import { SubmittedList } from "./SubmittedList";
export const PipelineTable = ({ active }) => {
  const { data, errorMessage, isLoading, refetch } = useFetch({
    initialUrl: `/dashboard/tables/pipeline`,
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
        Header: "Submitted",
        accessor: "submitted",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <SubmittedList
              data={row.original.submitted}
              url={`/dashboard/tables/pipeline/${row.original.job_id}/submitted`}
            ></SubmittedList>
          );
        },
      },
      {
        Header: "In-Process",
        accessor: "in_process",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <InProcessContactsList
              data={row.original.in_process}
              url={`/dashboard/tables/pipeline/${row.original.job_id}/in-process`}
            ></InProcessContactsList>
          );
        },
      },
      {
        Header: "For Offer",
        accessor: "offer",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <ForOfferList
              data={row.original.offer}
              url={`/dashboard/tables/pipeline/${row.original.job_id}/for-offer`}
            ></ForOfferList>
          );
        },
      },
      {
        Header: "Placement",
        accessor: "placement",
        disableSortBy: false,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <PlacementList
              data={row.original.offer}
              url={`/dashboard/tables/pipeline/${row.original.job_id}/placement`}
            ></PlacementList>
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
