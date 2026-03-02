import React from "react";

import { Col, Row } from "reactstrap";
import { useParams } from "react-router";

import { BarLoaderSpinner, ErrorHandler } from "components";
import { useFetch } from "hooks";

import { SearchStrategiesContext } from "./context/SearchStrategiesContext";
import { SearchStrategiesDisplay } from "./SearchStrategiesDisplay";
import { SearchStrategiesAdd } from "./SearchStrategiesAdd/SearchStrategiesAdd";

const SearchStrategiesMain = ({ header }) => {
  const { id } = useParams();
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `jobs/${id}/details/information/search-strategies`,
  });

  const value = { data, refetch };

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <SearchStrategiesContext.Provider value={value}>
      <Row className="my-2">
        <Col className="d-flex justify-content-start">{header}</Col>
        <Col className="d-flex justify-content-end">
          <SearchStrategiesAdd />
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      <SearchStrategiesDisplay />
    </SearchStrategiesContext.Provider>
  );
};

export { SearchStrategiesMain };
