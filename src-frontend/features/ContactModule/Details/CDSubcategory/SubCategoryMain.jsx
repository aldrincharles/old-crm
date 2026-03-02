import React from "react";

import { Row, Col, Card, CardBody } from "reactstrap";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { SubCategoryEdit } from "./SubCategoryEdit";
import { useParams } from "react-router";
import { SubCategoryDisplay } from "./SubCategoryDisplay";

export const SubCategoryMain = () => {
  const { id } = useParams();
  const url = `/contact/details/${id}/subcategories`;

  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: url,
  });

  const onSubmit = (value) => {
    setData({ ...data, ...value });
  };

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <Card className="my-2">
      <CardBody style={{ textAlign: "left" }}>
        <Row className="me-1 my-2">
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
      </CardBody>
    </Card>
  );
};
