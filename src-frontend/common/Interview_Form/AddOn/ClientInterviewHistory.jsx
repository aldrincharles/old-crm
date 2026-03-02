import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";

import { Button, TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";

import { useToggle, useAxiosPrivate } from "hooks";
import { BarLoaderSpinner, BootstrapModal } from "components";
import { ClientInterviewHistoryTable, ClientInterviewFeedback } from "./Tabs";

export const ClientInterviewHistory = ({ reachout_id }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="primary" onClick={toggle}>
        View Client Interview History
      </Button>
      <InterviewDialogue
        reachout_id={reachout_id}
        visible={visible}
        toggle={toggle}
      />
    </>
  );
};

const InterviewDialogue = React.memo(({ reachout_id, visible, toggle }) => {
  const authAxios = useAxiosPrivate();

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("history");

  const retrieveData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authAxios.get(
        `/jobs/reachout/get-client-interview-history/${reachout_id}`
      );
      const result = response.data;
      setData(result.content);
    } finally {
      setLoading(false);
    }
  }, [authAxios, reachout_id]);

  const handleTabOnSelect = (key) => {
    if (activeTab !== key) setActiveTab(key);
  };

  useEffect(() => {
    if (visible) {
      retrieveData();
    }
  }, [retrieveData, visible]);

  return (
    <BootstrapModal size="xl" isOpen={visible} toggle={toggle}>
      <BootstrapModal.Header>Client Interview History</BootstrapModal.Header>
      <BootstrapModal.Body>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames(
                { active: activeTab === "history" },
                "pointer-active"
              )}
              onClick={() => {
                handleTabOnSelect("history");
              }}
            >
              Interview History
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classNames(
                { active: activeTab === "feedback" },
                "pointer-active"
              )}
              onClick={() => {
                handleTabOnSelect("feedback");
              }}
            >
              Client/Candidate Feedback
            </NavLink>
          </NavItem>
        </Nav>

        {isLoading && <BarLoaderSpinner />}
        <TabContent activeTab={activeTab}>
          <TabPane tabId="history">
            <ClientInterviewHistoryTable data={data} />
          </TabPane>
          <TabPane tabId="feedback">
            <ClientInterviewFeedback
              data={data}
              reachout_id={reachout_id}
              onRefetch={retrieveData}
            />
          </TabPane>
        </TabContent>
      </BootstrapModal.Body>
      <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
    </BootstrapModal>
  );
});
