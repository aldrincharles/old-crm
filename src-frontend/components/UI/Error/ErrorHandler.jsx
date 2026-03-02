import React from "react";
import PropTypes from "prop-types";

import { Button } from "reactstrap";

const ErrorHandler = React.memo(({ minHeight = 50, onRetry }) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: `${minHeight}vh`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2 className="alert-heading">Oops!</h2>
        <p> Something went wrong</p>
        {onRetry && (
          <Button color="primary" onClick={onRetry}>
            Retry
          </Button>
        )}
      </div>
    </div>
  );
});

export { ErrorHandler };

ErrorHandler.propTypes = {
  minHeight: PropTypes.number,
  onRetry: PropTypes.func,
};
