import "./style/main.css";
import React, { useState } from "react";

import styled from "styled-components";
import { Card, CardTitle } from "reactstrap";
import MultiProvider from "context/MultiProvider";

import { ContactAnalyticsFilters } from "./ContactAnalyticsFilters";
import { ToggleComponents } from "./ToggleComponents";

import { ContactAnalyticsTable } from "./ContactAnalyticsTable";
import { TierBreakdown } from "./Charts/TierBreakdown";
import { Gender } from "./Charts/Gender";
import { IndustryPopulation } from "./Charts/IndustryPopulation";
import { AgeGroup } from "./Charts/AgeGroup";
import { Tenure } from "./Charts/Tenure";
import { Movement } from "./Charts/Movement";
import { AgeGroupTier } from "./Charts/AgeGroupTier";
import { TenureGroupTier } from "./Charts/TenureGroupTier";
import { IVNotes } from "./Charts/IVNotes";
import { Connections } from "./Charts/Connections";

import { SearchProvider } from "./context/Search";
import { ContactsProvider } from "./context/Contacts";

const FilterStyle = styled.div`
  @media (max-width: 700px) {
    padding-top: 64px;
  }
  @media (min-width: 700px) {
    position: fixed;
    width: 330px;
    height: calc(100% - 150px);
    overflow-y: scroll;
  }
`;

const ContentStyle = styled.div`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  overflow-y: scroll;
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 345px;
    height: calc(100% - 150px);
    width: calc(100% - 365px);
  }
`;

const toggle = [
  {
    id: 1,
    name: "Table",
    active: true,
    Components: <ContactAnalyticsTable />,
  },
  {
    id: 2,
    name: "Tier Breakdown",
    active: true,
    Components: <TierBreakdown />,
  },
  {
    id: 3,
    name: "Gender",
    active: true,
    Components: <Gender />,
  },
  {
    id: 4,
    name: "Age Group",
    active: true,
    Components: <AgeGroup />,
  },
  {
    id: 5,
    name: "Industry",
    active: true,
    Components: <IndustryPopulation />,
  },
  {
    id: 6,
    name: "Tenure per Tier",
    active: true,
    Components: <TenureGroupTier />,
  },
  {
    id: 7,
    name: "Age per Tier",
    active: true,
    Components: <AgeGroupTier />,
  },
  {
    id: 8,
    name: "Tenure",
    active: true,
    Components: <Tenure />,
  },
  {
    id: 9,
    name: "Movement",
    active: true,
    Components: <Movement />,
  },
  {
    id: 10,
    name: "IV Notes",
    active: true,
    Components: <IVNotes />,
  },

  {
    id: 11,
    name: "Connections",
    active: true,
    Components: <Connections />,
  },
];

const ContactAnalyticsMain = () => {
  const [selectAll, setSelectAll] = useState(true);
  const [form, setForm] = useState(toggle);

  return (
    <MultiProvider
      providers={[
        <SearchProvider name="contacts_analytics_search" />,
        <ContactsProvider name="contacts_analytics_table" />,
      ]}
    >
      <FilterStyle>
        <Card className="mb-2">
          <ContactAnalyticsFilters />
        </Card>
        <Card>
          <ToggleComponents
            form={form}
            setForm={setForm}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
          />
        </Card>
      </FilterStyle>
      <ContentStyle>
        {form[0].active ? (
          <Card className="mb-2">
            <ContactAnalyticsTable />
          </Card>
        ) : null}
        <div className="contact-analytics-grid">
          {form.slice(1).map(({ id, name, Components, active }) => {
            if (active) {
              return (
                <Card
                  key={id}
                  className="shadow-sm bg-white rounded contact-analytics-box"
                >
                  <CardTitle tag="h4">{name}</CardTitle>
                  {Components}
                </Card>
              );
            }
            return null;
          })}
        </div>
      </ContentStyle>
    </MultiProvider>
  );
};

export { ContactAnalyticsMain };
