import React from "react";

import { Card, CardBody, Row, Col } from "reactstrap";
import { useParams } from "react-router";

import { useFetch } from "hooks";
import { ErrorHandler } from "components";
import { CDSalaryDisplay } from "./CDSalaryDisplay";
import { CDSalaryEdit } from "./CDSalaryEdit";

export const CDSalaryMain = () => {
  const { id } = useParams();
  const { data, isLoading, errorMessage, setData, refetch } = useFetch({
    initialUrl: `/contact/${id}/salary-information`,
  });

  if (errorMessage) return <ErrorHandler onRetry={refetch} />;

  return (
    <Card>
      <CardBody style={{ textAlign: "left" }}>
        <Row className="me-1 my-2">
          <Col>
            <h3>Salary Details</h3>
          </Col>
          <Col style={{ textAlign: "right" }}>
            {data && (
              <CDSalaryEdit
                data={data}
                id={id}
                onRefetch={(e) => {
                  setData({ ...data, ...e });
                }}
              />
            )}
          </Col>
        </Row>
        <CDSalaryDisplay data={data} isLoading={isLoading} />
      </CardBody>
    </Card>
  );
};
