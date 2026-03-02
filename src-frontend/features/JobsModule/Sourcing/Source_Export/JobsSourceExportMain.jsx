import React, { useState, useCallback, useContext } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "context/Auth";
import { BarLoaderSpinner, Conditional } from "components";
import { ExportCSV } from "common";
import { useFetch, useAxiosPrivate } from "hooks";

import { ExportContacts } from "./ActionButtons/ExportContacts";
import { MoveToVerification } from "./ActionButtons/MoveToVerification";
import { JobsSourceExportDisplay } from "./JobsSourceExportDisplay";
import { AdvanceExport } from "./ActionButtons/AdvanceExport";

export const JobsSourceExportMain = () => {
  const authAxios = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const { id } = useParams();

  const [selectedRow, setSelectedRow] = useState([]);

  const { data, refetch, setData, isLoading, errorMessage } = useFetch({
    initialUrl: `/jobs/sourcing/${id}`,
  });

  const handleUpdate = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const handleOnSelectedRows = useCallback((selectedRows) => {
    setSelectedRow(selectedRows);
  }, []);

  const handleDelete = async () => {
    let listIDs = [];
    // eslint-disable-next-line array-callback-return
    selectedRow.map((data) => {
      listIDs.push({ id: data.sourcing_id });
    });

    const response = authAxios.delete(`/sourcing/delete`, {
      data: {
        sourcing_id: listIDs,
      },
    });

    await toast.promise(response, {
      pending: {
        render() {
          return "Pending";
        },
      },
      success: {
        render({ data }) {
          const message = data.data?.message;
          return `${message} 👌`;
        },
      },
      error: {
        render() {
          return "Oops! Something went wrong 🤯";
        },
      },
    });
    refetch();
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <ExportContacts jobID={id} onFetch={refetch} />
      </div>
      <div className="d-flex justify-content-end mb-2">
        <MoveToVerification id={id} />
        {auth?.access_limit === 0 && (
          <ExportCSV
            className="me-1 ms-1"
            url={`/jobs/sourcing/export-to-csv/${id}`}
            fileName={`Sourcing_Export_`}
            outline
          >
            CSV
          </ExportCSV>
        )}
        <AdvanceExport onRefetch={refetch} />
      </div>

      {isLoading && <BarLoaderSpinner />}
      {data ? (
        <JobsSourceExportDisplay
          data={data}
          handleUpdate={handleUpdate}
          onSelectRows={handleOnSelectedRows}
          onSelectedDelete={handleDelete}
        />
      ) : null}
      <Conditional if={errorMessage}>
        <h3>{errorMessage}</h3>
      </Conditional>
      <Conditional if={!isLoading && !errorMessage && !data}>
        <h3> No EXPORT data found...</h3>
      </Conditional>
      {/* <pre>{JSON.stringify(selectedRow, null, 2)}</pre> */}
    </>
  );
};
