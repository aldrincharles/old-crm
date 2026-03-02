/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Row, Col, ButtonGroup } from "reactstrap";

import { FetchProvider } from "context/FetchContext";
import { FetchFilterProvider } from "context/FetchFilter";

import {
  JobListDisplay,
  JobDetailsAdd,
  JobListFilter,
} from "features/JobsModule/List";

const JobListMain = () => {
  return (
    <FetchFilterProvider name={`jobs`}>
      <FetchProvider url={`/jobs`}>
        <Row>
          <Col lg="auto" className="d-flex justify-content-start">
            <h1>JOBS</h1>
          </Col>
          <Col className="mb-2 d-flex justify-content-end">
            <ButtonGroup vertical>
              <JobDetailsAdd />
            </ButtonGroup>
          </Col>
        </Row>
        <JobListFilter />
        <JobListDisplay />
        <FetchProvider.Pagination />
      </FetchProvider>
    </FetchFilterProvider>
  );
};
export default JobListMain;
