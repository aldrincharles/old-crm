import React from "react";

import { Col, Row } from "reactstrap";

import { ErrorHandler } from "components";

import { CDBDisplay } from "./CDBDisplay";
import { CDBEdit } from "./CDBEdit";
import { useFetch } from "hooks";
import { useParams } from "react-router";

// const initialState = {
//   cdb_name: "Test",
//   cdb_position: "Test",
//   cdb_linkedin: "Test",
//   cdb_email: "Test@test.com",
//   cdb_mobile: "111",
// };

const CDBMain = ({ header }) => {
  // const [data, setData] = useState(initialState);
  const { id } = useParams();
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `jobs/${id}/details/information/talent-personnel`,
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
          {data && <CDBEdit data={data} onSubmit={onSubmit} />}
        </Col>
      </Row>

      <CDBDisplay data={data} isLoading={isLoading} />
    </>
  );
};

export { CDBMain };
