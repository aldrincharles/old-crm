import React from "react";

import { Helmet } from "react-helmet";

export const PageTitle = ({ title, meta = [] }) => {
  return (
    <Helmet
      title={`${title} - Itel International`}
      htmlAttributes={{ lang: "en" }}
      meta={meta}
    />
  );
};
