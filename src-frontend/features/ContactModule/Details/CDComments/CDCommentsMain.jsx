/* eslint-disable array-callback-return */
import React, { useState, useCallback } from "react";

import { Card, CardBody, Row, Col } from "reactstrap";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import { useFetch, useAxiosPrivate } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";

import { CDCommentsAdd } from "./CDCommentsAdd";
import { CDCommentsDisplay } from "./CDCommentsDisplay";

export const CDCommentsMain = () => {
  const { id } = useParams();
  const authAxios = useAxiosPrivate();
  const [selectedRow, setSelectedRow] = useState([]);
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/contact/${id}/comments`,
  });

  const handleOnSelectedRows = useCallback((selectedRows) => {
    setSelectedRow(selectedRows);
  }, []);

  const handleOnDelete = async () => {
    let listIDs = [];
    selectedRow.map((data) => {
      listIDs.push({ id: data.comment_id });
    });
    try {
      const response = authAxios.delete(`/contact/comments`, {
        data: { comment_ids: listIDs },
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

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <Card className="my-2">
      <CardBody>
        <Row className="me-1 my-2">
          <Col style={{ textAlign: "left" }}></Col>
          <Col style={{ textAlign: "right" }}>
            <CDCommentsAdd id={id} onRefetch={refetch} />
          </Col>
        </Row>
        {isLoading && <BarLoaderSpinner />}

        <CDCommentsDisplay
          data={data}
          setSelectedRow={handleOnSelectedRows}
          onDelete={handleOnDelete}
        />
      </CardBody>
    </Card>
  );
};
