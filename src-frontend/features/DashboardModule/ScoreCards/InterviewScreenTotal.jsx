import React from "react";
import { Card, Row, Col } from "reactstrap";
import { InternalInterviewList } from "./InternalInterviewList";
const InterviewScreenTotal = ({ data }) => {
  //   const state = useSearchContext();
  //   const mergedState = useMemo(() => {
  //     return { ...state };
  //   }, [state]);
  //   const { data, isLoading, errorMessage, refetch, updateParams } = useFetch({
  //     initialUrl: `/analytics-report/sourcing-movement/new-hires/${id}`,
  //     initialParams: mergedState,
  //   });

  //   useEffect(() => {
  //     updateParams(mergedState);
  //   }, [mergedState, updateParams]);
  //   if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      <Row>
        <Col>
          <h3 className="mt-5 d-flex justify-content-center">ITEL Screen IV Total</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col className="fw-bold">Current Day</Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <InternalInterviewList
                  data={data.current_iv_1}
                  url={"/dashboard/internal-interview/screen-iv/current"}
                ></InternalInterviewList>
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
                <InternalInterviewList
                  data={data.week_iv_1}
                  url={"/dashboard/internal-interview/screen-iv/week"}
                ></InternalInterviewList>
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
                <InternalInterviewList
                  data={data.month_iv_1}
                  url={"/dashboard/internal-interview/screen-iv/month"}
                ></InternalInterviewList>
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

export { InterviewScreenTotal };
