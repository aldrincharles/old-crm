import React from "react";

import { Link } from "react-router-dom";

export const ClientLinkBadge = ({ id, organization }) => {
  return (
    <>
      <Link to={`/client/${id}/search`}>
        <i className="fas fa-sync-alt me-2"></i>
      </Link>
      <Link to={`/client/${id}/candidate-pipeline/active`}>
        <i className="fas fa-user-alt me-2"></i>
      </Link>
      <Link to={`/client/${id}/sla`}>
        <i className="fas fa-calendar me-2"></i>
      </Link>
      <Link to={`/client/${id}/daily-report`}>
        <i className="fas fa-clipboard-check me-2"></i>
      </Link>
    </>
  );
};
