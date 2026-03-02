/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React from "react";

import { Badge, Card, CardBody, Row, Col } from "reactstrap";

import { dateFormatter } from "utils";
import { CDPreviousRoleEdit } from "./CDPreviousRoleEdit";

export const CDPreviousRoleDisplay = React.memo(
  ({ data, updateMyValue = () => null, onRefetch = () => null }) => {
    //process object to be evaluated on Main file
    const processObject = (index, data) => {
      Object.keys(data).map((key) => {
        updateMyValue(index, key, data[key]);
      });
    };

    return (
      <div
        style={{
          height: "400px",
          overflowY: "auto",
        }}
      >
        {data?.length > 0 &&
          data?.map((content, i) => (
            <Card
              key={i}
              className="my-3 shadow p-3 bg-white rounded"
              outline
              color="info"
            >
              <CardBody>
                <Row className="me-1 my-2">
                  <Col>
                    <h3>{content.job_title}</h3>
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    <CDPreviousRoleEdit
                      id={content.previous_role_id}
                      data={content}
                      onUpdateValues={(data) => {
                        processObject(i, data);
                      }}
                      onRefetch={onRefetch}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span className="top-label">Organization</span>
                    {content.organization.label}
                  </Col>
                  <Col>
                    <span className="top-label">Position</span>
                    {content.position.label}
                  </Col>
                  <Col>
                    <span className="top-label">Seniority</span>
                    {content.seniority.label}
                  </Col>
                  <Col>
                    <span className="top-label">Time Frame</span>
                    {content.time_frame
                      ? dateFormatter(content.time_frame, {
                          month: "long",
                          year: "numeric",
                        })
                      : null}
                  </Col>
                  <Col>
                    <span className="top-label">Location</span>
                    {content.location.label}
                  </Col>
                  <Col>
                    <span className="top-label">Geography</span>
                    {content.geography.label}
                  </Col>
                  <Col>
                    <span className="top-label">Industry</span>
                    {content.industry.label}
                  </Col>
                  <Col>
                    <span className="top-label">Vertical</span>
                    {content.vertical.label}
                  </Col>
                  <Col>
                    <span className="top-label">Winners Club</span>
                    {content.winners_club === true ? "YES" : "NO"}
                  </Col>
                </Row>
                <div className="card card-recent-messages mg-t-10">
                  <div className="card-header">
                    <span>Sales Specialization</span>
                  </div>
                  <div className="list-group list-group-flush">
                    <div className="list-group-item">
                      {content.sales_specializations.map((data, i) => (
                        <Badge key={i} className="me-2" color="info">
                          {data.value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
    );
  }
);
