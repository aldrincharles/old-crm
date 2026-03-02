import React from "react";

import { useParams } from "react-router";

import { FetchProvider } from "context/FetchContext";
import { FetchFilterProvider } from "context/FetchFilter";

import { EmployeesDisplay } from "./FounderDisplay";

export const FounderMain = () => {
  const { id } = useParams();

  return (
    <FetchFilterProvider name={`organization_${id}_founders`}>
      <FetchProvider url={`organization/${id}/people/founder`}>
        <h3 style={{ textAlign: "left" }}>Founder</h3>
        <FetchProvider.Error />
        <EmployeesDisplay />
        <FetchProvider.Pagination />
      </FetchProvider>
    </FetchFilterProvider>
  );
};
