import React from "react";

import { useParams } from "react-router";

import { FetchProvider } from "context/FetchContext";
import { FetchFilterProvider } from "context/FetchFilter";

import { HQManagementDisplay } from "./HQManagementDisplay";

export const HQManagementMain = () => {
  const { id } = useParams();

  return (
    <FetchFilterProvider name={`organization_${id}_HQManagement`}>
      <FetchProvider url={`organization/${id}/people/hq-management`}>
        <h3 style={{ textAlign: "left" }}>HQ Management</h3>
        <FetchProvider.Error />
        <HQManagementDisplay />
        <FetchProvider.Pagination />
      </FetchProvider>
    </FetchFilterProvider>
  );
};
