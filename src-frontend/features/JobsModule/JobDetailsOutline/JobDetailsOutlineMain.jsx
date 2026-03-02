import React, { useMemo, useState } from "react";

import { useParams } from "react-router-dom";
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle } from "hooks";
import { RoleOverview, CompanyIntro, HiringManagers } from "./Tabs";
import classNames from "classnames";

const JobDetailsOutlineMain = () => {
  //   const { pathname } = useLocation();
  //   const isInfoPath = matchPath("/jobs/:id/details/information", pathname);

  //   const componentRef = useRef();

  const { id } = useParams();

  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="warning" onClick={toggle}>
        <>
          <i className="ion-eye"></i> View Outline
        </>
      </Button>
      {visible ? (
        <DisplayOutline id={id} visible={visible} toggle={toggle} />
      ) : null}
    </>
  );
};

const DisplayOutline = ({ id, visible, toggle }) => {
  //   const { data, errorMessage, isLoading, refetch } = useFetch({
  //     initialUrl: "/contacts/analytics/age-group/tier",
  //   });
  const [activeTab, setActiveTab] = useState("company_intro");
  // const [loading, setLoading] = useState(true);

  const handleTabOnSelect = (key) => {
    if (activeTab !== key) setActiveTab(key);
  };
  const tabPane = useMemo(
    () => [
      {
        name: "Company Intro",
        id: "company_intro",
        component: <CompanyIntro id={id} />,
      },
      {
        name: "Role Overview",
        id: "role_overview",
        component: <RoleOverview id={id} />,
      },
      {
        name: "Hiring Managers",
        id: "hiring_managers",
        component: <HiringManagers id={id} />,
      },
    ],
    [id]
  );

  // const retrieveData = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await authAxios.get(
  //       `/contact-information/${modal_contact_id}`
  //     );
  //     const result = response.data;
  //     setData(result.content);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [authAxios, id]);

  return (
    <>
      <BootstrapModal size="xl" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>Job Outline</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Nav className="mb-2" tabs>
            {tabPane.map((data, i) => (
              <NavItem key={i}>
                <NavLink
                  // disabled={loading}
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
        <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
export { JobDetailsOutlineMain };
