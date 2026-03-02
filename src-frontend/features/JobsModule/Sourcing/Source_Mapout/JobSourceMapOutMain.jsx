/* eslint-disable array-callback-return */
import React, { useState, useCallback } from "react";

import { Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";

import { Conditional, BarLoaderSpinner } from "components";
import { AddMapOut } from "./AddMapOut";
import { useFetch, useAxiosPrivate } from "hooks";
import { JobSourceMapOutDisplay } from "./JobSourceMapOutDisplay";
import { toast } from "react-toastify";

export const JobSourceMapOutMain = () => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();

  const [selectedRow, setSelectedRow] = useState([]);
  const { data, refetch, setData, isLoading, errorMessage } = useFetch({
    initialUrl: `/jobs/sourcing/mapout/${id}`,
  });

  const HandleUpdateValue = () => {
    refetch();
  };

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
    selectedRow.map((data) => {
      listIDs.push({ id: data.sourcing_id });
    });

    const response = authAxios.delete(`/sourcing/delete`, {
      data: {
        sourcing_id: listIDs,
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
      <Row className="my-4">
        <Col></Col>
        <Col className="d-flex flex-row-reverse">
          <AddMapOut id={id} onUpdateValue={HandleUpdateValue} />
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      {data ? (
        <JobSourceMapOutDisplay
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
    </>
  );
};
