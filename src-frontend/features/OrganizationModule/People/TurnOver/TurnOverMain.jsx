import React from "react";

import { useParams } from "react-router";

import { FetchProvider } from "context/FetchContext";
import { FetchFilterProvider } from "context/FetchFilter";

import { TurnOverDisplay } from "./TurnOverDisplay";
import { TurnOverFilter } from "./TurnOverFilter";

export const TurnOverMain = () => {
  const { id } = useParams();

  return (
    <FetchFilterProvider name={`organization_${id}_TurnOver`}>
      <FetchProvider url={`organization/${id}/people/turnover`}>
        <h3 style={{ textAlign: "left" }}>Attrition</h3>
        <FetchProvider.Error />
        <TurnOverFilter />
        <TurnOverDisplay />
        <FetchProvider.Pagination />
      </FetchProvider>
    </FetchFilterProvider>
  );
};
