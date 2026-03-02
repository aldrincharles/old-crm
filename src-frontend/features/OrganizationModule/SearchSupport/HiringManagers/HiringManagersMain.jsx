import React from "react";

import { Col, Row } from "reactstrap";

import { HiringManagersAdd } from "./HiringManagersAdd";
import { HiringManagersDisplay } from "./HiringManagersDisplay";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { useFetch } from "hooks";

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

const HiringManagersMain = ({ id }) => {
  // const [data, setData] = useState(initialState);

  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `organization/${id}/search-support/hiring-managers`,
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
    <h3 style={{textAlign:"left"}}>Hiring Managers</h3>
      <Row className="my-2">
        <Col className="d-flex justify-content-end">
          <HiringManagersAdd onAdd={onAdd}>
            Add Hiring Manager
          </HiringManagersAdd>
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      <HiringManagersDisplay data={data} onDelete={onDelete} onRefetch={refetch} />
    </>
  );
};

export { HiringManagersMain };
