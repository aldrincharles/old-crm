import React from "react";

import { Table } from "reactstrap";

import { useFetchTest } from "hooks";
import { ChartPie, ErrorHandler, Skeleton } from "components";

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

const IVNotes = () => {
  const state = useSearchContext();
  const { data, isLoading, error, refetch } = useFetchTest({
    initialUrl: "/contacts/analytics/iv-notes",
    initialParams: state?.search,
  });

  if (error) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <Display
      data={data?.iv_notes || []}
      total={data?.total}
      isLoading={isLoading}
    />
  );
};

export { IVNotes };
