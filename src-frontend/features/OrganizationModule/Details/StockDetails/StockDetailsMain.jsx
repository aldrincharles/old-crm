import React from "react";

import { Row, Col } from "reactstrap";

import { BarLoaderSpinner, ErrorHandler } from "components";
import { useFetch } from "hooks";
import { StockDetailsEdit } from "./StockDetailsEdit";
import { StockDetailsDisplay } from "./StockDetailsDisplay";
export const StockDetailsMain = ({ id }) => {
  const url = `/organization/details/${id}/stock-details`;

  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: url,
  });

  //   const handleUpdate = (rowIndex, columnId, value) => {
  //     setData((old) =>
  //       old.map((row, index) => {
  //         if (index === rowIndex) {
  //           return {
  //             ...old[rowIndex],
  //             [columnId]: value,
  //           };
  //         }
  //         return row;
  //       })
  //     );
  //   };

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <div>
      {isLoading && <BarLoaderSpinner />}

      <Row>
        <Col style={{ textAlign: "left" }}>
          <h3>Stock Details</h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          {data ? (
            <>
              <StockDetailsEdit
                id={id}
                data={data}
                url={url}
                refetchData={refetch}
              ></StockDetailsEdit>
            </>
          ) : null}
        </Col>
      </Row>
      <StockDetailsDisplay data={data}></StockDetailsDisplay>
    </div>
  );
};
