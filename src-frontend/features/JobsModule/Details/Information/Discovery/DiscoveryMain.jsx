import React from "react";

import { EditableDetail } from "common";

import { DiscoveryAdd } from "./DiscoveryAdd";
import { DiscoveryDisplay } from "./DiscoveryDisplay";
import { Col, Row } from "reactstrap";
import { useParams } from "react-router";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { useFetch } from "hooks";

// const initialState = [
//   {
//     name: { value: "name0", label: "name0" },
//     organization: { value: "organization0", label: "organization0" },
//   },
//   {
//     name: { value: "name1", label: "name1" },
//     organization: { value: "organization1", label: "organization1" },
//   },
//   {
//     name: { value: "name3", label: "name3" },
//     organization: { value: "organization2", label: "organization2" },
//   },
// ];

const DiscoveryMain = ({ header }) => {
  const { id } = useParams();
  // const [data, setData] = useState(initialState);

  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `jobs/${id}/details/information/interviewed-candidates`,
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
      <div className="d-flex justify-content-start">{header}</div>

      <div style={{ textAlign: "left" }}>
        <EditableDetail
          url={`jobs/${id}/details/information/client-search-discovery/search-open-for`}
          title="How Long is the Search Open"
          keyVar="search_open_for"
        />
        <EditableDetail
          url={`/jobs/${id}/details/information/client-search-discovery/did-to-find`}
          title="What has been to find a candidate?"
          keyVar="did_to_find"
        />
      </div>

      <Row className="my-2">
        <Col className="d-flex justify-content-start">
          <h4>Who has been interviewed?</h4>
        </Col>
        <Col className="d-flex justify-content-end">
          <DiscoveryAdd onAdd={onAdd}>Add</DiscoveryAdd>
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      <DiscoveryDisplay data={data} onDelete={onDelete} />
    </>
  );
};

export { DiscoveryMain };
