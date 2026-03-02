import React from "react";

import { useParams } from "react-router";

import { FetchProvider } from "context/FetchContext";
import { FetchFilterProvider } from "context/FetchFilter";

import { NewHireDisplay } from "./NewHireDisplay";
import { NewHireFilter } from "./NewHireFilter";

export const NewHireMain = () => {
  const { id } = useParams();

  return (
    <FetchFilterProvider name={`organization_${id}_NewHire`}>
      <FetchProvider url={`organization/${id}/people/new-hires`}>
        <h3 style={{ textAlign: "left" }}>New Hire</h3>
        <FetchProvider.Error />
        <NewHireFilter />
        <NewHireDisplay />
        <FetchProvider.Pagination />
      </FetchProvider>
    </FetchFilterProvider>
  );
};
