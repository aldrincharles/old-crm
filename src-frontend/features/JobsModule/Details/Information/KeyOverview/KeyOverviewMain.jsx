import React from "react";

import { Col, Row } from "reactstrap";
import { useParams } from "react-router";

import { ErrorHandler } from "components";
import { useFetch } from "hooks";

import { KeyOverviewDisplay } from "./KeyOverviewDisplay";
import { KeyOverviewEdit } from "./KeyOverviewEdit";

// const initialState = {
//   why_change: "Test",
//   target_compensation: "Test",
//   team_size: "Test",
//   position_overview:
//     "•simply dummy text of the printing \n •test \n •since the 1500s",
//   experience: "•Lorem Ipsum is not simply \n •word in classical \n •test",
//   key_attributes:
//     "• All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary \n •combined with a handful of model  \n •de Finibus Bonorum et Malorum by Cicero ",
//   personality: "•test \n •test \n •test",
//   vertical: "•test \n •test \n •test",
//   commission_targets: "Test",
// };

const KeyOverviewMain = ({ header }) => {
  // const [data, setData] = useState(initialState);
  const { id } = useParams();
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `jobs/${id}/details/information/key-overview`,
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
          {data && <KeyOverviewEdit data={data} onSubmit={onSubmit} />}
        </Col>
      </Row>

      <KeyOverviewDisplay data={data} isLoading={isLoading} />
    </>
  );
};

export { KeyOverviewMain };
