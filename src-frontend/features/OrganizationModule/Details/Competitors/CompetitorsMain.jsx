import React from "react";

import { Row, Col } from "reactstrap";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { CompetitorsEdit } from "./CompetitorsEdit";
import { CompetitorsDisplay } from "./CompetitorsDisplay";

export const CompetitorsMain = ({ id }) => {
  const url = `/organization/situation/${id}/competitors`;

  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: url,
  });

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <div className="px-4 pb-4">
      <Row className="mb-2">
        <Col style={{ textAlign: "left" }}>
          <h3>Competitors</h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          {data ? (
            <CompetitorsEdit
              data={data}
              url={url}
              onRefetch={(e) => {
                setData({ ...data, ...e });
              }}
            />
          ) : null}
        </Col>
      </Row>

      {isLoading && <BarLoaderSpinner />}
      <CompetitorsDisplay data={data} />
    </div>
  );
};
