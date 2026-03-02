import React, { useState, useContext } from "react";

import { Row, Col } from "reactstrap";
import { useParams } from "react-router";

import { AsyncSelectWrap } from "components";
import { FetchContext } from "context/FetchContext";
import { FetchFilterContext, pageNext } from "context/FetchFilter";

export const JSMasterlistSelector = ({ setMasterlist_id }) => {
  const { updateUrl } = useContext(FetchContext);
  const { dispatch } = useContext(FetchFilterContext);
  const { id } = useParams();
  const [jobName, setJobName] = useState("");

  const handleJobChange = (event) => {
    let masterlist_id = event.value;
    setMasterlist_id(masterlist_id);
    setJobName(event.label);

    updateUrl(`/jobs/show-masterlist/${masterlist_id}/${id}`);
    dispatch(pageNext(1));
  };

  return (
    <>
      <Row>
        <Col>
          <AsyncSelectWrap
            name="masterlist"
            dependencies={{ url: "/parameters", topic: "masterlist" }}
            onChange={handleJobChange}
            defaultValue={{
              value: "List of Masterlist",
              label: "List of Masterlist",
            }}
          />
        </Col>
        <Col></Col>
      </Row>
      <hr className="my-2"></hr>
      <h3>{jobName}</h3>
    </>
  );
};
