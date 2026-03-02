import React from "react";
import { useParams } from "react-router";

import { FounderMain } from "./Founder/FounderMain";
import { HQManagementMain } from "./HQManagement/HQManagementMain";
import { NewHireMain } from "./NewHire/NewHireMain";
import { TurnOverMain } from "./TurnOver/TurnOverMain";
import { EmployeesMain } from "./Employees/EmployeesMain";
import { BoardMembersMain } from "./BoardMembers/BoardMembersMain";
import { InternalBandingsMain } from "../Details/InternalBandings/InternalBandingsMain";

const OrganizationPeople = () => {
  const { id } = useParams();

  return (
    <>
      <div className="mb-5">
        <FounderMain />
      </div>
      <div className="mb-5">
        <HQManagementMain />
      </div>
      <div className="mb-5">
        <NewHireMain />
      </div>
      <div className="mb-5">
        <TurnOverMain />
      </div>

      <BoardMembersMain />

      <EmployeesMain />
      <div className="my-5">
        <InternalBandingsMain id={id}></InternalBandingsMain>
      </div>
    </>
  );
};

export { OrganizationPeople };
