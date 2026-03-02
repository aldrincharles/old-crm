/* eslint-disable array-callback-return */
import React, { useState, useCallback } from "react";

import { useParams } from "react-router";

import { useFetch, useAxiosPrivate } from "hooks";
import { Card, CardBody } from "reactstrap";
import { BarLoaderSpinner, ErrorHandler } from "components";

import { CDResumeAdd } from "./CDResumeAdd";
import { CDResumeDisplay } from "./CDResumeDisplay";
import { toast } from "react-toastify";

export const CDResumeMain = () => {
  const { id } = useParams();
  const authAxios = useAxiosPrivate();
  const [selectedRow, setSelectedRow] = useState([]);
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/contact/${id}/resume`,
  });

  const handleOnSelectedRows = useCallback((selectedRows) => {
    setSelectedRow(selectedRows);
  }, []);

  const handleOnDelete = async () => {
    let listIDs = [];
    selectedRow.map((data) => {
      listIDs.push({ id: data.resume_id });
    });
    try {
      const response = authAxios.delete(`/contact/resume`, {
        data: { archive_ids: listIDs },
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
    <>
      <Card className="my-2">
        <CardBody>
          <CDResumeAdd id={id} onRefetch={refetch} />
          {isLoading && <BarLoaderSpinner />}
          <CDResumeDisplay
            data={data}
            setSelectedRow={handleOnSelectedRows}
            onDelete={handleOnDelete}
          />
        </CardBody>
      </Card>
    </>
  );
};
