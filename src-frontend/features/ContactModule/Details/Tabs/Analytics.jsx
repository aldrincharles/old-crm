import React from "react";

import { CDLatestActivityMain } from "../CDLatestActivity/CDLatestActivityMain";
import { CDJobsExportedMain } from "../CDJobsExported/CDJobsExportedMain";

export const Analytics = () => {
  return (
    <>
      <CDLatestActivityMain />
      <CDJobsExportedMain />
    </>
  );
};
