import React from "react";

import { Row, Col } from "reactstrap";

import { BarLoaderSpinner, ErrorHandler } from "components";
import { useFetch } from "hooks";
import { AcquisitionsDisplay } from "./AcquisitionsDisplay";
import { AcquisitionsAdd } from "./AcquisitionsAdd";

export const AcquisitionsMain = ({ id }) => {
  const url = `/organization/situation/${id}/acquisitions`;

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
          <h3>Acquisitions</h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <AcquisitionsAdd url={url} onRefetch={refetch} />
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      <AcquisitionsDisplay
        data={data}
        url={url}
        onRefetch={refetch}
        onUpdateValues={handleUpdate}
      />
    </div>
  );
};
