import React, { useState, useCallback } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";

import { Conditional, BarLoaderSpinner } from "components";
import { useFetch, useAxiosPrivate } from "hooks";
import { JobSourceVerificationDisplay } from "./JobSourceVerificationDisplay";
import { toast } from "react-toastify";

export const JobSourceVerificationMain = () => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState([]);
  const { data, refetch, setData, isLoading, errorMessage } = useFetch({
    initialUrl: `/jobs/sourcing/verification/${id}`,
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

  const handleVerificationTable = async () => {
    const response = authAxios.post(`/jobs/sourcing/verify-contacts/${id}`, {
      job_id: id,
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
      navigate(`/jobs/${id}/reachout/sendout`);
    } finally {
    }
  };

  return (
    <>
      <Row>
        <Col></Col>
        <Col className="d-flex flex-row-reverse mb-4">
          <Button color="primary" onClick={handleVerificationTable}>
            Verify Contacts
          </Button>
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      {data ? (
        <JobSourceVerificationDisplay
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
