/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { Table } from "reactstrap";

import { ChartPie, ErrorHandler, Skeleton } from "components";
import { useFetchTest } from "hooks";

import { useSearchContext } from "../context/Search";

const Display = React.memo(({ data, total, isLoading }) => {
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
          <ChartPie data={data || []} />
        </div>
      )}
      <Table>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data.map(({ name, y }) => (
              <tr key={name}>
                <th>{isLoading ? <Skeleton /> : name}</th>
                <td>{isLoading ? <Skeleton /> : y}</td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total:</th>
            <td>{isLoading ? <Skeleton /> : total}</td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
});

const TierBreakdown = () => {
  const state = useSearchContext();
  const { data, isLoading, error, refetch } = useFetchTest({
    initialUrl: "/contacts/analytics/tier",
    initialParams: state?.search,
  });

  if (error) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <Display data={data?.tier_list} total={data?.total} isLoading={isLoading} />
  );
};

export { TierBreakdown };
