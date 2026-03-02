/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Table, Row, Col, Card } from "reactstrap";
import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";

import {
  ReachOutTotal,
  InterviewScreenTotal,
  InterviewInDepthTotal,
} from "features/DashboardModule/ScoreCards";
const ScoreCardMain = () => {
  const { data, errorMessage, isLoading, refetch } = useFetch({
    initialUrl: `/dashboard`,
  });
  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <Table bordered>
        {data && (
          <tbody>
            <tr style={{ border: "0" }}>
              <th style={{ border: "0" }}>
                <Card>
                  <Row>
                    <Col>
                      <h5>Date Today:</h5>
                    </Col>
                    <Col>
                      <h5>{data.date_today}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h5>Active Jobs:</h5>
                    </Col>
                    <Col>
                      <h5>{data.active_jobs}</h5>
                    </Col>
                  </Row>
                </Card>
              </th>
            </tr>
            <tr>
              <th>
                <ReachOutTotal data={data} />
              </th>
              <th>
                <InterviewScreenTotal data={data}></InterviewScreenTotal>
              </th>
              <th>
                <InterviewInDepthTotal data={data}></InterviewInDepthTotal>
              </th>
            </tr>
          </tbody>
        )}
      </Table>
      {/* <Row>
        <Col>
          <ReachOutTotal></ReachOutTotal>
        </Col>
        <Col>
          <InterviewScreenTotal></InterviewScreenTotal>
        </Col>
        <Col>
          <InterviewInDepthTotal></InterviewInDepthTotal>
        </Col>
      </Row> */}
    </>

    // <FetchFilterProvider name={`jobs`}>
    //   <FetchProvider url={`/jobs`}>
    //     <Row>
    //       <Col lg="auto" className="d-flex justify-content-start">
    //         <h1>JOBS</h1>
    //       </Col>
    //       <Col className="mb-2 d-flex justify-content-end">
    //         <ButtonGroup vertical>
    //           <JobDetailsAdd />
    //         </ButtonGroup>
    //       </Col>
    //     </Row>
    //     <JobListFilter />
    //     <JobListDisplay />
    //     <FetchProvider.Pagination />
    //   </FetchProvider>
    // </FetchFilterProvider>
  );
};
export default ScoreCardMain;
