/* eslint-disable react/display-name */
import React, { useEffect, useMemo } from "react";

import { useParams } from "react-router";

import {
  BootstrapModal,
  AnimatedSmartTable,
  BarLoaderSpinner,
  IconButton,
  ErrorHandler,
} from "components";
import { useToggle, useFetch } from "hooks";
import { gradingColor } from "constants";
import { ContactInformation } from "common";
import { useTable } from "../context/TableProvider";
import { useSearchContext } from "../context/Search";
export const OrganizationContacts = ({ row }) => {
  const { id } = row.original;
  const [visible, toggle] = useToggle();

  return (
    <>
      <IconButton
        style={{
          cursor: "pointer",
        }}
        className="fas fa-list-alt"
        onClick={toggle}
      />
      <ContactsList organization_id={id} visible={visible} toggle={toggle} />
    </>
  );
};

const ContactsList = React.memo(({ organization_id, visible, toggle }) => {
  const { id } = useParams();

  const filter = useSearchContext();
  const table = useTable();

  const mergedState = useMemo(() => {
    return { ...filter, ...table };
  }, [filter, table]);
  const { data, errorMessage, isLoading, refetch, updateParams } = useFetch({
    initialUrl: `/analytics-report/sourcing-movement/organization-mapout/${id}/contact-list/${organization_id}`,
    initialParams: mergedState,
  });

  const columns = useMemo(
    () => [
      {
        Header: "STRATEGY",
        accessor: "strategy",
        disableFilters: true,
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
        Header: "RESPONSE",
        accessor: "response",
        disableFilters: true,
      },
    ],
    []
  );
  useEffect(() => {
    updateParams(mergedState);
  }, [mergedState, updateParams]);

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
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
});
