/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";

import React, { useMemo, useState } from "react";
import {
  Row,
  Col,
  NavItem,
  Nav,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import ScoreCardMain from "features/DashboardModule/ScoreCards/ScoreCardMain";
import {
  ReachOutTable,
  InternalInterviewTable,
  PipelineTable,
  RejectedTable,
} from "features/DashboardModule/DashboardTables";
const DashboardMain = () => {
  const [activeTab, setActiveTab] = useState("reach_out");

  const handleTabOnSelect = (key) => {
    if (activeTab !== key) setActiveTab(key);
  };

  const tabs = useMemo(
    () => [
      {
        name: "Reach Out",
        id: "reach_out",
        component: <ReachOutTable />,
      },
      {
        name: "Internal Interview",
        id: "internal_interview",
        component: <InternalInterviewTable />,
      },
      {
        name: "Pipeline",
        id: "pipeline",
        component: <PipelineTable />,
      },
      {
        name: "Rejected",
        id: "rejected",
        component: <RejectedTable />,
      },
    ],
    []
  );
  return (
    <>
      <Row>
        <Col lg="auto" className="d-flex justify-content-start mb-3">
          <h1>DASHBOARD</h1>
        </Col>
      </Row>
      <Row>
        <ScoreCardMain></ScoreCardMain>
      </Row>
      <div>
        <Nav pills>
          {tabs.map((data, i) => (
            <NavItem key={i}>
              <NavLink
                className={classNames(
                  { active: activeTab === `${data.id}` },
                  "pointer-active"
                )}
                onClick={() => {
                  handleTabOnSelect(`${data.id}`);
                }}
              >
                {data.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent className="mt-5" activeTab={activeTab}>
          {tabs.map((data) => (
            <TabPane key={data.id} tabId={`${data.id}`}>
              {activeTab === data.id ? data.component : null}
            </TabPane>
          ))}
        </TabContent>
      </div>
      {/* <div>
        <ReachOutTable></ReachOutTable>
      </div> */}
    </>
  );
};
export default DashboardMain;
