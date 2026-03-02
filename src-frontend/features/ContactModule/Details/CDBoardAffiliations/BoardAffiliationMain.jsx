import React, { useState, useCallback } from "react";

import { Card, CardBody, Row, Col } from "reactstrap";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import { useFetch, useAxiosPrivate } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";

import { BoardAffiliationAdd } from "./BoardAffiliationAdd";
import { BoardAffiliationDisplay } from "./BoardAffiliationDisplay";

export const BoardAffiliationMain = () => {
  const { id } = useParams();
  const authAxios = useAxiosPrivate();
  const [selectedRow, setSelectedRow] = useState([]);

  const url = `/contact/${id}/board-affiliations`;
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: url,
  });

  const handleOnSelectedRows = useCallback((selectedRows) => {
    setSelectedRow(selectedRows);
  }, []);

  const handleOnDelete = async () => {
    let listIDs = [];
    selectedRow.map((data) => {
      return listIDs.push({ id: data.id });
    });
    try {
      const response = authAxios.delete(url, {
        data: { items: listIDs },
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
    <>
      <Card className="my-2">
        <CardBody style={{ textAlign: "left" }}>
          <Row className="me-1 my-2">
            <Col style={{ textAlign: "left" }}>
              <h3>Board Affiliation</h3>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <BoardAffiliationAdd url={url} onRefetch={refetch} />
            </Col>
          </Row>
          {isLoading && <BarLoaderSpinner />}
          <BoardAffiliationDisplay
            data={data}
            onSelectRows={handleOnSelectedRows}
            onSelectedDelete={handleOnDelete}
          />
        </CardBody>
      </Card>
    </>
  );
};
