/* eslint-disable array-callback-return */
import React, { useState, useCallback } from "react";

import { toast } from "react-toastify";
import { useParams } from "react-router";

import { useFetch, useAxiosPrivate } from "hooks";
import { Card, CardBody } from "reactstrap";
import { BarLoaderSpinner, ErrorHandler } from "components";

import { CDNoteArchiveAdd } from "./CDNoteArchiveAdd";
import { CDNoteArchiveDisplay } from "./CDNoteArchiveDisplay";

export const CDNoteArchiveMain = () => {
  const { id } = useParams();
  const authAxios = useAxiosPrivate();
  const [selectedRow, setSelectedRow] = useState([]);
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/contact/${id}/interview-notes`,
  });

  const handleOnSelectedRows = useCallback((selectedRows) => {
    setSelectedRow(selectedRows);
  }, []);

  const handleOnDelete = async () => {
    let listIDs = [];
    selectedRow.map((data) => {
      listIDs.push({ id: data.interview_id });
    });
    try {
      const response = authAxios.delete(`/contact/interview-notes`, {
        data: { interview_ids: listIDs },
      });

      toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });

      refetch();
    } catch (error) {}
  };

  if (errorMessage) return <ErrorHandler onRetry={refetch} />;

  return (
    <Card className="my-2">
      <CardBody>
        <CDNoteArchiveAdd id={id} onRefetch={refetch} />
        {isLoading && <BarLoaderSpinner />}

        <CDNoteArchiveDisplay
          data={data}
          setSelectedRow={handleOnSelectedRows}
          onDelete={handleOnDelete}
        />
      </CardBody>
    </Card>
  );
};
