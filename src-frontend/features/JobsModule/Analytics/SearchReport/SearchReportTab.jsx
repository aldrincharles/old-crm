import React from "react";

import { ForwardedCandidatesTable } from "./ForwardedCandidates/ForwardedCandidatesTable";
import { InternalInterviewTable } from "./InternalInterview/InternalInterviewTable";
import { ClientInterviewTable } from "./ClientInterview/ClientInterviewTable";
import { PlacementTable } from "./Placement/PlacementTable";
import { ReportDetailsDisplay } from "./ReportDetails/ReportDetailsDisplay";
import { SearchStrategyDisplay } from "./SearchStrategy/SearchStrategyDisplay";
import { SourcingResponsesDisplay } from "./SourcingResponses/SourcingResponsesDisplay";
import { WinningCandidateDisplay } from "./HiringManager/WinningCandidateDisplay";
import { HiringManagerDisplay } from "./HiringManager/HiringManagerDisplay";

export const SearchReportTab = ({ id }) => {
  return (
    <>
      <ReportDetailsDisplay id={id} />
      <SearchStrategyDisplay id={id} />
      <SourcingResponsesDisplay id={id} />

      <h3 className="mt-3">Internal Interview Reports</h3>
      <InternalInterviewTable id={id} />

      <h3 className="mt-3">Forwarded Candidates Reports</h3>
      <ForwardedCandidatesTable id={id} />

      <h3 className="mt-3">Client Interview Reports</h3>
      <ClientInterviewTable id={id} />

      <h3 className="mt-3">Placement List</h3>
      <PlacementTable id={id} />

      <h3 className="mt-3">Hiring Manager Interview</h3>
      <WinningCandidateDisplay id={id} />
      <HiringManagerDisplay id={id} />
    </>
  );
};
