/* eslint-disable react/display-name */
import React, { useContext, useMemo } from "react";

import { Link } from "react-router-dom";

import { FetchContext } from "context/FetchContext";
import { ContactInformation } from "common";
import { BarLoaderSpinner, ErrorHandler, SimpleTable } from "components";
import { dateFormatter } from "utils";

export const HQManagementDisplay = () => {
  const { data, isLoading, error, retrieveData } = useContext(FetchContext);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row: { original } }) => {
          return (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={`/contacts/details/${original.contact_id}/information`}
            >
              {original.name}
            </Link>
          );
        },
      },
      {
        Header: () => null,
        id: "contactInformation",
        width: 75,
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
        Header: "Job Title",
        accessor: "job_title",
      },
      {
        Header: "Position",
        accessor: "position",
      },
      {
        Header: "Date Started (C)",
        accessor: "date_started_company",
        Cell: ({ row: { original } }) => {
          let dt = original.date_started_company
            ? dateFormatter(original.date_started_company, {
                month: "long",
                year: "numeric",
              })
            : "-";
          return dt;
        },
      },
      {
        Header: "Date Started (P)",
        accessor: "date_started_position",
        Cell: ({ row: { original } }) => {
          let dt = original.date_started_position
            ? dateFormatter(original.date_started_position, {
                month: "long",
                year: "numeric",
              })
            : "-";
          return dt;
        },
      },
      {
        Header: "Industry",
        accessor: "industry",
      },
      {
        Header: "Vertical",
        accessor: "vertical",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Geography",
        accessor: "geography",
      },
      {
        Header: "Category",
        accessor: "category",
      },
    ],
    []
  );

  if (error) return <ErrorHandler minHeight={25} onRetry={retrieveData} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <SimpleTable
        isLoading={isLoading}
        columns={columns}
        data={data}
        properties={{ height: "auto" }}
      />
    </>
  );
};
