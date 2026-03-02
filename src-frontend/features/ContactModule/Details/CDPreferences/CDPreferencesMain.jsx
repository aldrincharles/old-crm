import React from "react";

import { Card, CardBody, Row, Col } from "reactstrap";
import { useParams } from "react-router";

import { useFetch } from "hooks";
import { ErrorHandler } from "components";
import { CDPreferencesEdit } from "./CDPreferencesEdit";
import { CDPreferencesDisplay } from "./CDPreferencesDisplay";

export const CDPreferencesMain = () => {
  const { id } = useParams();
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/contact/${id}/preferences`,
  });

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <Card>
      <CardBody style={{ textAlign: "left" }}>
        <Row className="me-1 my-2">
          <Col>
            <h3>Preferences</h3>
          </Col>
          <Col style={{ textAlign: "right" }}>
            {data && (
              <CDPreferencesEdit
                id={id}
                isDisabled={isLoading}
                onRefetch={(e) => {
                  setData({ ...data, ...e });
                }}
              />
            )}
          </Col>
        </Row>
        <CDPreferencesDisplay data={data} isLoading={isLoading} />
      </CardBody>
    </Card>
  );
};
