import React from "react";

import { Card, CardBody, Row, Col } from "reactstrap";
import { useParams } from "react-router";

import { useFetch } from "hooks";
import { ErrorHandler } from "components";
import { CDBasicInformationDisplay } from "./CDBasicInformationDisplay";
import { CDBasicInformationEdit } from "./CDBasicInformationEdit";

export const CDBasicInformationMain = () => {
  const { id } = useParams();
  const { data, isLoading, errorMessage, setData, refetch } = useFetch({
    initialUrl: `/contact/${id}/basic-information`,
  });

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <Card>
      <CardBody style={{ textAlign: "left" }}>
        <Row className="me-1 my-2">
          <Col>
            <h3>{data?.name}</h3>
            <p>
              {data?.job_title} at &nbsp;
              <a
                href={`/organization/${data?.organization_id}`}
                target="_blank"
                rel="noreferrer"
              >
                {data?.organization.label}
              </a>
            </p>
          </Col>
          <Col style={{ textAlign: "right" }}>
            {data && (
              <CDBasicInformationEdit
                data={data}
                id={id}
                onRefetch={(e) => {
                  setData({ ...data, ...e });
                }}
              />
            )}
          </Col>
        </Row>
        <CDBasicInformationDisplay data={data} isLoading={isLoading} />
      </CardBody>
    </Card>
  );
};
