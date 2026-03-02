import React from "react";

import { useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";

import { ListItems, EditableDetail } from "common";
import { APJLocationsMain } from "./APJLocations/APJLocationsMain";

export const OrganizationSituation = () => {
  const { id } = useParams();

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <EditableDetail
          url={`/organization/details/${id}/high-level-overview`}
          title="Company Pitch"
        />
        <EditableDetail
          url={`/organization/details/${id}/general-overview`}
          title="General Overview"
        />
        <EditableDetail
          url={`/organization/details/${id}/industry-segment`}
          title="Overview of Industry Segment"
        />
        <EditableDetail
          url={`/organization/situation/${id}/global-strategy`}
          title="Global Strategy"
        />
      </div>
      <Row>
        <Col>
          <ListItems
            title="Key Global Logos"
            url={`/organization/situation/${id}/key-global-logos`}
          />
        </Col>
        <Col>
          <ListItems
            title="Global Partners"
            url={`/organization/situation/${id}/global-partners`}
          />
        </Col>
      </Row>
      <div>
        <APJLocationsMain id={id}></APJLocationsMain>
      </div>
    </>
  );
};

export default OrganizationSituation;
