import React from "react";

import { Card, CardBody, Row, Col } from "reactstrap";
import { useParams } from "react-router";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";

import { CDPreviousRoleAdd } from "./CDPreviousRoleAdd";
import { CDPreviousRoleDisplay } from "./CDPreviousRoleDisplay";

export const CDPreviousRoleMain = () => {
  const { id } = useParams();
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/contact/${id}/previous-role`,
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

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <Card className="my-2">
      <CardBody style={{ textAlign: "left" }}>
        <Row className="me-1 my-2">
          <Col style={{ textAlign: "left" }}>
            <h3>Previous Roles</h3>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <CDPreviousRoleAdd id={id} onRefetch={refetch} />
          </Col>
        </Row>
        {isLoading && <BarLoaderSpinner />}
        <CDPreviousRoleDisplay
          data={data}
          updateMyValue={handleUpdate}
          onRefetch={refetch}
        />
      </CardBody>
    </Card>
  );
};
