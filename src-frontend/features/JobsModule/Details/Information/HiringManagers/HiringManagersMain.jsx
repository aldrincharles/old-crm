import React from "react";

import { Col, Row } from "reactstrap";

import { HiringManagersAdd } from "./HiringManagersAdd";
import { HiringManagersDisplay } from "./HiringManagersDisplay";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { useFetch } from "hooks";
import { useParams } from "react-router";

// const initialState = [
//   {
//     name: { value: "name0", label: "name0" },
//     position: { value: "position0", label: "position0" },
//     linked_in: "linkedin0",
//     email: "email0",
//   },
//   {
//     name: { value: "name1", label: "name1" },
//     position: { value: "position1", label: "position1" },
//     linked_in: "linkedin1",
//     email: "email1",
//   },
//   {
//     name: { value: "name3", label: "name3" },
//     position: { value: "position2", label: "position2" },
//     linked_in: "linkedin2",
//     email: "email2",
//   },
// ];

const HiringManagersMain = ({ header }) => {
  // const [data, setData] = useState(initialState);

  const { id } = useParams();
  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `jobs/${id}/details/information/hiring-managers`,
  });

  const onAdd = (newElement) => {
    setData((oldArray) => [...oldArray, newElement]);
  };

  const onDelete = (id) => {
    setData((current) => current.filter((e) => e.id !== id));
  };

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      <Row className="my-2">
        <Col className="d-flex justify-content-start">{header}</Col>
        <Col className="d-flex justify-content-end">
          <HiringManagersAdd onAdd={onAdd}>Add</HiringManagersAdd>
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      <HiringManagersDisplay data={data} onDelete={onDelete} />
    </>
  );
};

export { HiringManagersMain };
