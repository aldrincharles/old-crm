import React, { useContext } from "react";

import { Conditional } from "components";
import { FetchContext } from "context/FetchContext";

export const ErrorHandler = () => {
  const { error } = useContext(FetchContext);

  return (
    <Conditional if={error}>
      <h3>{error}</h3>
    </Conditional>
  );
};
