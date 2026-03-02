import React from "react";

import { Row, Col } from "reactstrap";

import { BarLoaderSpinner, ErrorHandler } from "components";
import { useFetch } from "hooks";

import { InternalBandingsDisplay } from "./InternalBandingsDisplay";
import { InternalBandingsAdd } from "./InternalBandingsAdd";

export const InternalBandingsMain = ({ id }) => {
  const url = `/organization/asia-overview/${id}/internal-banding`;

  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: url,
  });

  const handleUpdate = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      <Row className="mb-2">
        <Col style={{ textAlign: "left" }}>
          <h3>Internal Bandings</h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <InternalBandingsAdd url={url} onRefetch={refetch} />
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      <InternalBandingsDisplay
        data={data}
        url={url}
        onRefetch={refetch}
        onUpdateValues={handleUpdate}
      />
    </>
  );
};
