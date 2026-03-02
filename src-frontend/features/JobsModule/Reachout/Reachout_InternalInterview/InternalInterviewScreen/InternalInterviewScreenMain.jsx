/* eslint-disable array-callback-return */
import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Conditional, BarLoaderSpinner } from "components";
import { useFetch, useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";
import { InternalInterviewScreenDisplay } from "./InternalInterviewScreenDisplay";
export const InternalInterviewScreenMain = () => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();
  const [selectedRow, setSelectedRow] = useState([]);

  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/jobs/reachout/internal-interview/screen-iv/${id}`,
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
    let tableStage = 3; //stage 3- internal interview
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
        <InternalInterviewScreenDisplay
          data={data}
          handleUpdate={handleUpdate}
          onSelectRows={handleOnSelectedRows}
          onSelectedDelete={handleDelete}
          authAxios={authAxios}
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
