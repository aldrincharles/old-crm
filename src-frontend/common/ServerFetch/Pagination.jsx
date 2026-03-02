import React, { useContext } from "react";

import { Pagination as PaginationComponent } from "components";
import { FetchContext } from "context/FetchContext";

import { FetchFilterContext, pageNext, pageSize } from "context/FetchFilter";

export const Pagination = ({ sizeOption = [10, 20, 30, 40, 50, 100] }) => {
  const { state, dispatch } = useContext(FetchFilterContext);
  const { data, isLoading, error, totalCount } = useContext(FetchContext);

  const handlePageSizeChange = (event) => {
    let size = event.target.value;
    if (state.page === size) return;
    dispatch(pageSize(size));
  };

  const handlePageChange = (page) => {
    if (state.page === page) return;
    dispatch(pageNext(page));
  };

  return (
    <div style={{ textAlign: "left" }}>
      {data?.length > 0 && !error && (
        <>
          {"Items per page: "}
          <select
            disabled={isLoading}
            onChange={handlePageSizeChange}
            value={state.size}
          >
            {sizeOption.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <PaginationComponent
            isLoading={isLoading}
            currentPage={state.page}
            pageSize={state.size}
            totalCount={totalCount}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
