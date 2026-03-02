import React from "react";

import { Col, Row } from "reactstrap";

import { ErrorHandler } from "components";
import { useFetch } from "hooks";

import { BasicDisplay } from "./BasicDisplay";
import { BasicEdit } from "./BasicEdit";
import { useParams } from "react-router";

// const initialState = {
//   search_number: 1235678,
//   job_status: { value: "Active", label: "Active" },
//   raas_itel: { value: "RaaS", label: "RaaS" },
//   company: "Test",
//   activation_date: new Date(),
//   position: "Test",
//   position_count: 1,
//   location: "Test",
//   geography: "Test",
//   replacement: "New Position",
//   interview_stages_count: 1,
// };

const BasicMain = ({ header }) => {
  // const [data, setData] = useState(initialState);
  const { id } = useParams();
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `jobs/${id}/details/information/basic-info`,
  });

  const onSubmit = (value) => {
    setData({ ...data, ...value });
  };

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      <Row className="my-2">
        <Col className="d-flex justify-content-start">{header}</Col>
        <Col className="d-flex justify-content-end">
          {data && <BasicEdit data={data} onSubmit={onSubmit} />}
        </Col>
      </Row>

      <BasicDisplay data={data} isLoading={isLoading} />
    </>
  );
};

export { BasicMain };
