import React, { useState, useCallback, useContext } from "react";
import { ButtonGroup } from "reactstrap";
import { useParams } from "react-router-dom";

import { AuthContext } from "context/Auth";
import { Conditional, BarLoaderSpinner } from "components";
import { useFetch, useAxiosPrivate } from "hooks";
import { ExportCSV } from "common";
import { ReachoutSendoutDisplay } from "./ReachoutSendoutDisplay";
import { toast } from "react-toastify";

export const ReachoutSendOutMain = () => {
  const { auth } = useContext(AuthContext);
  const authAxios = useAxiosPrivate();
  const { id, jobName } = useParams();

  const [selectedRow, setSelectedRow] = useState([]);
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/jobs/sendout/${id}`,
  });

  const handleOnSelectedRows = useCallback((selectedRows) => {
    setSelectedRow(selectedRows);
  }, []);

  const handleDelete = async () => {
    let listIDs = [];
    let tableStage = 1;
    selectedRow.map((data) => {
      return listIDs.push({ id: data.reachout_id });
    });

    const response = authAxios.delete(`/jobs/reachout/delete-list`, {
      data: {
        reachout_id_list: listIDs,
        reachout_stage: tableStage,
      },
    });

    try {
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
    } finally {
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <ButtonGroup vertical>
          {auth?.access_limit === 0 && (
            <>
              <ExportCSV
                color="info"
                url={`/jobs/reachout/reachout-to-csv/${id}`}
                fileName={`RO_Sendout_Masterlist_${jobName}`}
              >
                EXPORT TO CSV
              </ExportCSV>

              <ExportCSV
                className="my-1"
                url={`/jobs/reachout/csv-for-whispir/${id}`}
                fileName={`RO_FOR_WHISPIR_${jobName}`}
              >
                CSV FOR WHISPIR
              </ExportCSV>
            </>
          )}
        </ButtonGroup>
      </div>

      {isLoading && <BarLoaderSpinner />}
      {data ? (
        <ReachoutSendoutDisplay
          data={data}
          onSelectRows={handleOnSelectedRows}
          onSelectedDelete={handleDelete}
        />
      ) : null}
      <Conditional if={errorMessage}>
        <h3>{errorMessage}</h3>
      </Conditional>
      <Conditional if={!isLoading && !errorMessage && !data}>
        <h3> No data found...</h3>
      </Conditional>
      {/* <pre>{JSON.stringify(selectedRow, null, 2)}</pre> */}
    </>
  );
};
