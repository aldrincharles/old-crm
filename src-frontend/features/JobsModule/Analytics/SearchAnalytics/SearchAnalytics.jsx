import React, { forwardRef, useState } from "react";

import { Row, Col, Container, Card, CardTitle } from "reactstrap";
import { SearchProvider } from "./context/Search";
import { TableProvider } from "./context/TableProvider";
import MultiProvider from "context/MultiProvider";
import styled from "styled-components";
import { SearchAnalyticsFilters } from "./SearchAnalyticsFilter";
// import { ToggleComponents } from "./ToggleComponents";

import { OrganizationTable } from "./Organization/OrganizationTable";
import { IndustryTable } from "./Industry/IndustryTable";
import { GenderChart } from "./Gender/GenderChart";
import { AgeGroupChart } from "./AgeGroup/AgeGroupChart";
import { SummaryTable } from "./Summary/SummaryTable";
import { StrategyTotal } from "./StrategyTotal/StrategyTotal";
import { AddressableMarketChart } from "./AddressableMarket/AddressableMarketChart";
import { TargetCompanies } from "./TargetCompanies/TargetCompanies";
import { ReachoutBreakdown } from "./ReachoutBreakdown/ReachoutBreakdown";
import { ResponsesBreakdown } from "./ResponsesBreakdown/ResponsesBreakdown";
import { NewHire } from "./NewHire/NewHire";

import { TenureChart } from "./Tenure/TenureChart";
const FilterStyle = styled.div`
  @media (max-width: 700px) {
    padding-top: 64px;
  }
  @media (min-width: 700px) {
    position: absolute;
    width: 330px;
    height: 100%;
    overflow-y: scroll;
  }
`;

const ContentStyle = styled.div`
  height: calc(100% - 185px);
  overflow-y: scroll;
  width: 100%;
  @media (min-width: 700px) {
    padding: 10px;
    flex: 1;
    margin-left: 345px;
    height: 100%;
    width: calc(100% - 365px);
  }
`;
export const SearchAnalytics = forwardRef((props, ref) => {
  // const [selectAll, setSelectAll] = useState(true);
  // const [form, setForm] = useState(toggle);
  return (
    <MultiProvider
      providers={[
        <SearchProvider name="organization_analytics_search" />,
        <TableProvider name="organization_analytics_table" />,
      ]}
    >
      <Card className="mb-5">
        <SummaryTable id={props.id}></SummaryTable>
      </Card>
      <FilterStyle>
        <Card className="mb-2">
          <SearchAnalyticsFilters />
        </Card>
        {/* <Card>
          <ToggleComponents
            form={form}
            setForm={setForm}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
          />
        </Card> */}
      </FilterStyle>

      <ContentStyle>
        <Card>
          <div>
            <OrganizationTable id={props.id} />
          </div>
          <div>
            <IndustryTable id={props.id} />
          </div>
          <div>
            <StrategyTotal id={props.id} />
          </div>
          <div>
            <h4 style={{ textAlign: "left" }}>Breakdown of Reach Out</h4>
            <ReachoutBreakdown id={props.id} />
          </div>
          <Row>
            <Col>
              <h4 style={{ textAlign: "left" }}>Target Companies:</h4>
              <TargetCompanies id={props.id} />
            </Col>
            <Col>
              <h4 style={{ textAlign: "left" }}>New Hires:</h4>
              <NewHire id={props.id} />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <h4 style={{ textAlign: "left" }}>Total Addressable Market:</h4>
              <AddressableMarketChart id={props.id} />
            </Col>
            <Col>
              <h4 style={{ textAlign: "left" }}>Age Group:</h4>
              <AgeGroupChart id={props.id} />
            </Col>
            <Col>
              <h4 style={{ textAlign: "left" }}>Tenure (Months):</h4>
              <TenureChart id={props.id} />
            </Col>
          </Row>

          <div className="page-break" />
          <div className="print-source mb-5" />

          <Row className="mt-3">
            <Col>
              <h4 style={{ textAlign: "left" }}>Gender:</h4>
              <GenderChart id={props.id} />
            </Col>
            <Col>
              <h4 style={{ textAlign: "left" }}>Breakdown of Responses:</h4>
              <ResponsesBreakdown id={props.id} />
            </Col>
          </Row>
        </Card>
      </ContentStyle>
    </MultiProvider>
    // <div ref={ref}>
    //   <Container>
    //     <div className="no-print">
    //       <OrganizationTable id={props.id} />
    //       <IndustryTable id={props.id} />
    //     </div>

    //     <div className="print-body">
    //       <div className="print-section">
    //         <div>
    //           <div
    //             className="print-source text-info display-1"
    //             style={{ textAlign: "center" }}
    //           >
    //             <span style={{ fontFamily: "Times New Roman", color: "black" }}>
    //               Itel
    //             </span>
    //             Analytics
    //           </div>
    //           <div className="print-source" style={{ textAlign: "center" }}>
    //             <h2>{props?.name}</h2>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="page-break" />

    //       <div className="mt-5">
    //         <SummaryTable id={props.id} />
    //       </div>
    //       <div className="mt-5">
    //         <StrategyTotal id={props.id} />
    //       </div>

    //       <div className="page-break" />
    //       <div className="print-source mb-5" />

    //       <div>
    //         <h4 style={{ textAlign: "left" }}>Breakdown of Reachout:</h4>
    //         <ReachoutBreakdown id={props.id} />
    //       </div>

    //     </div>
    //   </Container>
    // </div>
  );
});
