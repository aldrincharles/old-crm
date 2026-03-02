import React from "react";

import { Row, Col } from "reactstrap";

import { BarLoaderSpinner, ErrorHandler } from "components";
import { useFetch } from "hooks";
import { ListItemDisplay } from "./ListItemDisplay";
import { ListItemAdd } from "./ListItemAdd";

export const ListItemMain = ({ title, url, minHeight = 25 }) => {
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

  if (errorMessage)
    return <ErrorHandler minHeight={minHeight} onRetry={refetch} />;

  return (
    <div className="px-4 pb-4">
      <Row className="mb-2">
        <Col style={{ textAlign: "left" }}>
          <h3>{title}</h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <ListItemAdd url={url} onRefetch={refetch} />
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      <ListItemDisplay
        data={data}
        onRefetch={refetch}
        url={url}
        updateMyValue={handleUpdate}
      />
    </div>
  );
};
