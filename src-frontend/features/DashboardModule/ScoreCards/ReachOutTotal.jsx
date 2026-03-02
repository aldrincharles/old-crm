import React from "react";
import { Row, Col, Card } from "reactstrap";
import { ROContactsList } from "../DashboardTables/ReachOut/ROContactsList";
const ReachOutTotal = ({ data }) => {
  return (
    <>
      {/* {isLoading && <BarLoaderSpinner />} */}

      <Row>
        <Col>
          <h3 className="mt-5 d-flex justify-content-center">
            Reach Out Total
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col className="fw-bold">Previous Day</Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <ROContactsList
                  data={data.previous_day_ro}
                  url={`/dashboard/reach-out/previous-day`}
                ></ROContactsList>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className="fw-bold">Current Week</Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <ROContactsList
                  data={data.week_reach_out}
                  url={`/dashboard/reach-out/current-week`}
                ></ROContactsList>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col className="fw-bold">Current Month</Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <ROContactsList
                  data={data.month_reach_out}
                  url={`/dashboard/reach-out/current-month`}
                ></ROContactsList>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* <Card
        style={{
          display: "flex",
          minHeight: `25vh`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "125px" }}>{data?.total || "0"}</span>
      </Card> */}
    </>
  );
};

export { ReachOutTotal };
