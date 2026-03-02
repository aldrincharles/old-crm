import React from "react";

import { Row, Col } from "reactstrap";

import { BarLoaderSpinner, ErrorHandler } from "components";
import { useFetch } from "hooks";
import { RevenueDisplay } from "./RevenueDisplay";
import { RevenueAdd } from "./RevenueAdd";

export const RevenueMain = ({ id }) => {
  const url = `/organization/situation/${id}/revenue`;

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
    <div className="px-4 pb-4">
      <Row className="mb-2">
        <Col style={{ textAlign: "left" }}>
          <h3>Revenue</h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <RevenueAdd url={url} onRefetch={refetch} />
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      <RevenueDisplay
        data={data}
        url={url}
        onRefetch={refetch}
        onUpdateValues={handleUpdate}
      />
    </div>
  );
};
