import React from "react";

import { Row, Col, Card, CardBody, CardHeader, Label } from "reactstrap";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { SubCategoryEdit } from "./SubCategoryEdit.jsx";
import { SubCategoryDisplay } from "./SubcategoryDisplay.jsx";
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
    <Card className="mg-t-10 mt-3">
      <CardBody style={{ textAlign: "left" }}>
        <Row className="me-1 my-2">
          <Label>
            <span>SubCategory</span>
          </Label>
          <Col style={{ textAlign: "right" }}>
            {data ? (
              <SubCategoryEdit data={data} url={url} onSubmit={onSubmit} />
            ) : null}
          </Col>
        </Row>

        {isLoading && <BarLoaderSpinner />}
        <SubCategoryDisplay data={data} />
      </CardBody>
    </Card>
  );
};
