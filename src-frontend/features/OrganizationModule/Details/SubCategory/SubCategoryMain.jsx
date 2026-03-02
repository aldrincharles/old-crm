import React from "react";

import { Row, Col } from "reactstrap";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { SubCategoryEdit } from "./SubCategoryEdit";
import { SubCategoryDisplay } from "./SubCategoryDisplay";

export const SubCategoryMain = ({ id }) => {
  const url = `/organization/situation/${id}/subcategories`;

  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: url,
  });

  const onSubmit = (value) => {
    setData({ ...data, ...value });
  };

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <div className="px-4 pb-4">
      <Row className="mb-2">
        <Col style={{ textAlign: "left" }}>
          <h3>Subcategory</h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          {data ? (
            <SubCategoryEdit data={data} url={url} onSubmit={onSubmit} />
          ) : null}
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      <SubCategoryDisplay data={data} />
    </div>
  );
};
