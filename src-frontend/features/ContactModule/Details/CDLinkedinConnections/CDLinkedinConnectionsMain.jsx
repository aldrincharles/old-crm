import React from "react";

import { Card, CardBody, Row, Col } from "reactstrap";
import { useParams } from "react-router";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { CDLinkedinConnectionsEdit } from "./CDLinkedinConnectionsEdit";
import { CDLinkedinConnectionsDisplay } from "./CDLinkedinConnectionsDisplay";

export const CDLinkedinConnectionsMain = () => {
  const { id } = useParams();
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/contact/${id}/linkedin-connections`,
  });

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <Card className="my-2">
      <CardBody style={{ textAlign: "left" }}>
        <Row className="me-1 my-2">
          <Col>
            <h3>LinkedIn Connections</h3>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <CDLinkedinConnectionsEdit
              data={data}
              id={id}
              isDisabled={isLoading}
              onRefetch={(e) => {
                setData({ ...data, ...e });
              }}
            />
          </Col>
        </Row>
        {isLoading && <BarLoaderSpinner />}
        <CDLinkedinConnectionsDisplay data={data} />
      </CardBody>
    </Card>
  );
};
