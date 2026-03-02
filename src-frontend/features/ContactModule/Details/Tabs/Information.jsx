import React from "react";

import { CDBasicInformationMain } from "../CDBasicInformation/CDBasicInformationMain";
import { CDPreviousRoleMain } from "../CDPreviousRole/CDPreviousRoleMain";
import { CDLinkedinConnectionsMain } from "../CDLinkedinConnections/CDLinkedinConnectionsMain";
import { SubCategoryMain } from "../CDSubcategory/SubCategoryMain";
export const Information = () => {
  return (
    <>
      <CDBasicInformationMain />
      <SubCategoryMain></SubCategoryMain>
      <CDPreviousRoleMain />
      <CDLinkedinConnectionsMain />
    </>
  );
};
