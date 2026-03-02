import React from "react";
import { Card, Row, Col } from "reactstrap";
import { InternalInterviewList } from "./InternalInterviewList";

const InterviewInDepthTotal = ({ data }) => {
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
      {/* {isLoading && <BarLoaderSpinner />} */}
      <Row>
        <Col>
          <h3 className="mt-5 d-flex justify-content-center">ITEL In-Depth IV Total</h3>
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
                  data={data.current_iv_2}
                  url={"/dashboard/internal-interview/in-depth/current"}
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
                  data={data.week_iv_2}
                  url={"/dashboard/internal-interview/in-depth/week"}
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
                  data={data.month_iv_2}
                  url={"/dashboard/internal-interview/in-depth/month"}
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

export { InterviewInDepthTotal };
