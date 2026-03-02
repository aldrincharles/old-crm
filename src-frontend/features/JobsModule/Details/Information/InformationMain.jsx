import React, { forwardRef } from "react";

import { BasicMain } from "./Basic/BasicMain";
import { CDBMain } from "./CDB/CDBMain";
import { KeyOverviewMain } from "./KeyOverview/KeyOverviewMain";
import { HiringManagersMain } from "./HiringManagers/HiringManagersMain";
import { DiscoveryMain } from "./Discovery/DiscoveryMain";
import { SearchStrategiesMain } from "./SearchStrategies/SearchStrategiesMain";

const InformationMain = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div className="print-body">
        <div className="print-section">
          <div>
            <div
              className="print-source text-info display-1"
              style={{ textAlign: "center" }}
            >
              <span style={{ fontFamily: "Times New Roman", color: "black" }}>
                Itel
              </span>
            </div>
            <div className="print-source" style={{ textAlign: "center" }}>
              <h2>{props?.name}</h2>
            </div>
          </div>
        </div>
        <div className="page-break" />

        <div className="print-source mb-3" />
        <BasicMain header={<h3>Information</h3>} />
        <CDBMain header={<h3>Itel Personnel</h3>} />
        <div className="page-break" />

        <div className="print-source mb-3" />
        <HiringManagersMain header={<h3>Hiring Managers</h3>} />
        <div className="page-break" />

        <div className="print-source mb-3" />
        <DiscoveryMain header={<h3>Client Search Discovery</h3>} />
        <div className="page-break" />

        <div className="print-source mb-3" />
        <KeyOverviewMain header={<h3>Key Overview</h3>} />
        <div className="page-break" />

        <div className="print-source mb-3" />
        <SearchStrategiesMain header={<h3>Search Strategies</h3>} />
      </div>
    </div>
  );
});

export { InformationMain };
