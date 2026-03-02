import React, { useEffect, useMemo } from "react";

import { useFetch } from "hooks";
import { ChartPie, ErrorHandler, Skeleton } from "components";
import { Table } from "reactstrap";
import { useSearchContext } from "../context/Search";

export const GenderChart = ({ id }) => {
  const state = useSearchContext();
  const mergedState = useMemo(() => {
    return { ...state };
  }, [state]);
  const { data, isLoading, errorMessage, refetch, updateParams } = useFetch({
    initialUrl: `/analytics-report/sourcing-movement/get-gender-count/${id}`,
    initialParams: mergedState,
  });
  useEffect(() => {
    updateParams(mergedState);
  }, [mergedState, updateParams]);
  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      {isLoading ? (
        <Skeleton
          circle
          style={{
            width: 300,
            height: 300,
          }}
        />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ChartPie
            data={
              [
                {
                  name: "Male",
                  symbol: { fill: "#8cd3ff" },
                  x: "Male",
                  y: data?.male,
                  fill: "#8cd3ff",
                },
                {
                  name: "Female",
                  symbol: { fill: "#fac6e5" },
                  x: "Female",
                  y: data?.female,
                  fill: "#fac6e5",
                },
                {
                  name: "No Record",
                  symbol: { fill: "#808080" },
                  x: "No Record",
                  y: data?.other,
                  fill: "#808080",
                },
              ] || []
            }
          />
        </div>
      )}

      <Table>
        <tbody>
          <tr>
            <th style={{ textAlign: "left" }}>Male:</th>
            <td>{false ? <Skeleton /> : data?.male}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Female:</th>
            <td>{false ? <Skeleton /> : data?.female}</td>
          </tr>
          <tr>
            <th style={{ textAlign: "left" }}>Unknown:</th>
            <td>{false ? <Skeleton /> : data?.other}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
