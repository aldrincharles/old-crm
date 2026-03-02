import React from "react";

import { Row, Col, ButtonGroup } from "reactstrap";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";

import {
  MasterListDisplay,
  MasterListAdd,
} from "features/MasterlistModule/List";

const MasterListMain = () => {
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: "/masterlist",
  });

  if (errorMessage) return <ErrorHandler onRetry={refetch} />;

  return (
    <>
      <Row>
        <Col lg="auto" className="d-flex justify-content-start">
          <h1>MASTER LIST</h1>
        </Col>
        <Col className="mb-2 d-flex justify-content-end">
          <ButtonGroup vertical>
            <MasterListAdd onRefetch={refetch} />
          </ButtonGroup>
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      <MasterListDisplay data={data || []} />
    </>
  );
};

export default MasterListMain;
