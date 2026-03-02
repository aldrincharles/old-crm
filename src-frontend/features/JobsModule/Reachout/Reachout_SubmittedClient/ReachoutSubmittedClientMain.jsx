/* eslint-disable array-callback-return */
import React, { useState, useCallback } from "react";

import { useParams } from "react-router-dom";

import { Conditional, BarLoaderSpinner } from "components";
import { useFetch, useAxiosPrivate } from "hooks";
import { ReachoutSubmittedClientDisplay } from "./ReachoutSubmittedClientDisplay";
import { toast } from "react-toastify";

export const ReachoutSubmittedClientMain = () => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();
  const [selectedRow, setSelectedRow] = useState([]);
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/jobs/reachout/submitted-to-client/${id}`,
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
    let tableStage = 4; //stage 4- submitted to client
    selectedRow.map((data) => {
      listIDs.push({ id: data.reachout_id });
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
      {isLoading && <BarLoaderSpinner />}
      {data ? (
        <ReachoutSubmittedClientDisplay
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
        <h3> No data found...</h3>
      </Conditional>
    </>
  );
};
