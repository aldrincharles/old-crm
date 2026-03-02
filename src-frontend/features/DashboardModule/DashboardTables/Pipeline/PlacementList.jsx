/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import {
  BootstrapModal,
  AnimatedSmartTable,
  BarLoaderSpinner,
  ErrorHandler,
} from "components";
import { useToggle, useFetch } from "hooks";
import { gradingColor } from "constants";
import { ContactInformation } from "common";

export const PlacementList = ({ data, url }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      {/* <IconButton
        style={{
          cursor: "pointer",
        }}
        className="fas fa-list-alt"
        onClick={toggle}
      /> */}
      <span className="text-primary" onClick={toggle}>
        {data}
      </span>
      {visible ? (
        <ContactsList url={url} visible={visible} toggle={toggle} />
      ) : null}
    </>
  );
};

const ContactsList = ({ url, visible, toggle }) => {
  const { data, errorMessage, isLoading, refetch } = useFetch({
    initialUrl: url,
  });

  const columns = useMemo(
    () => [
      {
        Header: "GRADE",
        accessor: "grading",
        disableFilters: true,
        Cell: ({ row }) => {
          const { grading } = row.original;
          return (
            <span className={`badge ${gradingColor[grading][0]}`}>
              {gradingColor[grading][1]}
            </span>
          );
        },
      },
      {
        Header: "NAME",
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
            <>
              <ContactInformation
                modal_contact_id={original.contact_id}
                shortcut_linked_in={original.linkedin}
              />
            </>
          );
        },
      },
      {
        Header: "DATE SUBMITTED",
        accessor: "date_submitted",
        disableFilters: true,
      },
      {
        Header: "LAST IV DATE",
        accessor: "last_iv_date",
        disableFilters: true,
      },
      {
        Header: "STATUS",
        accessor: "status",
        disableFilters: true,
      },
    ],
    []
  );

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
      <BootstrapModal.Header>
        <h3>PLACEMENT</h3>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <div
          style={{
            textAlign: "center",
          }}
        >
          {isLoading && <BarLoaderSpinner />}
          <AnimatedSmartTable data={data || []} columns={columns} />
        </div>
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};
