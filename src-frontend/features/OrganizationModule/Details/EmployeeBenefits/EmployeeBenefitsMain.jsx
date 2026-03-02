import React from "react";

import { Row, Col } from "reactstrap";

import { BarLoaderSpinner, ErrorHandler } from "components";
import { useFetch } from "hooks";
import { EmployeeBenefitsEdit } from "./EmployeeBenefitsEdit";
import { EmployeeBenefitsDisplay } from "./EmployeeBenefitsDisplay";
export const EmployeeBenefitsMain = ({ id }) => {
  const url = `/organization/details/${id}/employee-benefits`;

  const { data, setData, isLoading, errorMessage, refetch } = useFetch({
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
    <div className="px-4 pb-4">
      {isLoading && <BarLoaderSpinner />}

      <Row>
        <Col style={{ textAlign: "left" }}>
          <h3>Employee Benefits</h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          {data ? (
            <>
              <EmployeeBenefitsEdit
                id={id}
                data={data}
                url={url}
                refetchData={refetch}
              ></EmployeeBenefitsEdit>
            </>
          ) : null}
        </Col>
      </Row>
      <EmployeeBenefitsDisplay data={data}></EmployeeBenefitsDisplay>
    </div>
  );
};
