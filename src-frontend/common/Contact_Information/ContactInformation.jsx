import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import {
  BasicInformationTab,
  CommentsTab,
  ResumeTab,
  ArchiveTab,
  SalaryTab,
  AnalyticsTab,
} from "./Tabs";
import { IconButton, IconLinkButton, BootstrapModal } from "components";
import { useToggle, useAxiosPrivate } from "hooks";

export const ContactInformation = ({
  modal_contact_id,
  shortcut_linked_in,
  initialActiveTab = "basic",
}) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <IconButton
        className="icon-button ion-information-circled me-3"
        onClick={toggle}
      />
      <IconLinkButton
        href={shortcut_linked_in}
        target="_blank"
        rel="noreferrer"
        className="icon-button ion-person-stalker"
      />

      <ContactDialogue
        visible={visible}
        toggle={toggle}
        modal_contact_id={modal_contact_id}
        shortcut_linked_in={shortcut_linked_in}
        initialActiveTab={initialActiveTab}
      />
    </>
  );
};

const ContactDialogue = React.memo(
  ({
    toggle = false,
    visible,
    modal_contact_id,
    shortcut_linked_in,
    initialActiveTab,
  }) => {
    const authAxios = useAxiosPrivate();
    const [activeTab, setActiveTab] = useState(initialActiveTab);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const handleTabOnSelect = (key) => {
      if (activeTab !== key) setActiveTab(key);
    };

    const retrieveData = useCallback(async () => {
      setLoading(true);
      try {
        const response = await authAxios.get(
          `/contact-information/${modal_contact_id}`
        );
        const result = response.data;
        setData(result.content);
      } finally {
        setLoading(false);
      }
    }, [authAxios, modal_contact_id]);

    const tabPane = useMemo(
      () => [
        {
          name: "Basic",
          id: "basic",
          component: (
            <BasicInformationTab
              infoData={data}
              shortcut_linked_in={shortcut_linked_in}
              modal_contact_id={modal_contact_id}
              onRefetch={retrieveData}
              isLoading={loading}
            />
          ),
        },
        {
          name: "Comments",
          id: "comments",
          component: (
            <CommentsTab
              infoData={data}
              modal_contact_id={modal_contact_id}
              onRefetch={retrieveData}
              isLoading={loading}
            />
          ),
        },
        {
          name: "Resume",
          id: "resume",
          component: (
            <ResumeTab
              infoData={data}
              modal_contact_id={modal_contact_id}
              onRefetch={retrieveData}
            />
          ),
        },
        {
          name: "Salary",
          id: "salary",
          component: (
            <SalaryTab
              infoData={data}
              modal_contact_id={modal_contact_id}
              onRefetch={retrieveData}
              isLoading={loading}
            />
          ),
        },
        {
          name: "Archive",
          id: "archive",
          component: (
            <ArchiveTab
              infoData={data}
              onRefetch={retrieveData}
              isLoading={loading}
            />
          ),
        },
        {
          name: "Analytics",
          id: "analytics",
          component: <AnalyticsTab infoData={data} isLoading={loading} />,
        },
      ],
      [data, loading, modal_contact_id, retrieveData, shortcut_linked_in]
    );

    useEffect(() => {
      if (visible) {
        retrieveData();
      }
    }, [retrieveData, visible]);

    return (
      <BootstrapModal size="xl" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>Contact Information</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Nav className="mb-2" tabs>
            {tabPane.map((data, i) => (
              <NavItem key={i}>
                <NavLink
                  disabled={loading}
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
          <TabContent activeTab={activeTab}>
            {tabPane.map((data) => (
              <TabPane key={data.id} tabId={`${data.id}`}>
                {activeTab === data.id ? data.component : null}
              </TabPane>
            ))}
          </TabContent>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Link
            to={`/contacts/details/${modal_contact_id}/information`}
            className="btn btn-primary pull-right mg-t-10"
            target="_blank"
          >
            <i className="fas fa-user-edit"></i> Edit Contact
          </Link>
        </BootstrapModal.Footer>
      </BootstrapModal>
    );
  }
);
ContactInformation.propTypes = {
  modal_contact_id: PropTypes.string,
  shortcut_linked_in: PropTypes.string,
  initialActiveTab: PropTypes.string,
};
