import React from "react";

import {
  Route,
  useParams,
  useLocation,
  Routes,
  Navigate,
} from "react-router-dom";

import { NavLink } from "components";
import { HQManagementMain } from "./HQManagement/HQManagementMain";
import { APACManagementMain } from "./APACManagement/APACManagementMain";
import { SalesMain } from "./Sales/SalesMain";
import { ChannelAllianceMain } from "./ChannelAlliance/ChannelAllianceMain";
import { MarketingMain } from "./Marketing/MarketingMain";
import { PreSalesTechnicalMain } from "./PreSalesTechnical/PreSalesTechnicalMain";
import { HRRecruitmentMain } from "./HRRecruitment/HRRecruitmentMain";
import { ProfessionalServicesMain } from "./ProfessionalServices/ProfessionalServicesMain";
import { CustomerSuccessMain } from "./CustomerSuccess/CustomerSuccessMain";
import { OthersMain } from "./Others/OthersMain";

const OrganizationChart = () => {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;

  const navLinks = [
    {
      label: "HQ Management",
      to: `hq-management`,
      path: `hq-management`,
      component: <HQManagementMain id={id} />,
    },
    {
      label: "APAC Management",
      to: `apac-management`,
      path: `apac-management`,
      component: <APACManagementMain id={id} />,
    },
    {
      label: "Sales",
      to: `sales`,
      path: `sales`,
      component: <SalesMain id={id} />,
    },
    {
      label: "Channel and Alliance",
      to: `channel-alliance`,
      path: `channel-alliance`,
      component: <ChannelAllianceMain id={id} />,
    },
    {
      label: "Marketing",
      to: `marketing`,
      path: `marketing`,
      component: <MarketingMain id={id} />,
    },
    {
      label: "Presales and Technical",
      to: `presales-technical`,
      path: `presales-technical`,
      component: <PreSalesTechnicalMain id={id} />,
    },
    {
      label: "HR and Recruitment",
      to: `hr-recruitment`,
      path: `hr-recruitment`,
      component: <HRRecruitmentMain id={id} />,
    },
    {
      label: "Professional Services",
      to: `professional-services`,
      path: `professional-services`,
      component: <ProfessionalServicesMain id={id} />,
    },
    {
      label: "Customer Success",
      to: `customer-success`,
      path: `customer-success`,
      component: <CustomerSuccessMain id={id} />,
    },
    {
      label: "Others",
      to: `others`,
      path: `others`,
      component: <OthersMain id={id} />,
    },
  ];

  return (
    <>
      <div className="mb-3">
        <ul className="nav justify-content-center nav-tabs">
          {navLinks.map(({ label, to }) => (
            <li className="nav-item " key={to}>
              <NavLink
                state={{ name: data?.name }}
                className="nav-link"
                activeClassName="active"
                to={to}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Routes>
        <Route index element={<Navigate replace to="hq-management" />} />
        {navLinks.map(({ component, path, exact }) => (
          <Route exact={exact} key={path} path={path} element={component} />
        ))}
      </Routes>
    </>
  );
};
export { OrganizationChart };
