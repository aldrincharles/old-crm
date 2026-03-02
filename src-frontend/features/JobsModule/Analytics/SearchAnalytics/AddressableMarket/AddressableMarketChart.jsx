import React, { useEffect, useMemo } from "react";
import { useFetch } from "hooks";
import { ChartPie, ErrorHandler, Skeleton } from "components";
import { Table } from "reactstrap";
import { useSearchContext } from "../context/Search";
export const AddressableMarketChart = ({ id }) => {
  const state = useSearchContext();
  const mergedState = useMemo(() => {
    return { ...state };
  }, [state]);
  const { data, isLoading, errorMessage, refetch, updateParams } = useFetch({
    initialUrl: `/analytics-report/sourcing-movement/addressable-market/${id}`,
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
          <ChartPie data={data?.market || []} />
        </div>
      )}
      <Table>
        <tbody>
          {data?.market.length > 0 &&
            data.market.map(({ name, y }) => (
              <tr key={name}>
                <th style={{ textAlign: "left" }}>
                  {false ? <Skeleton /> : name}
                </th>
                <td>{false ? <Skeleton /> : y}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};
