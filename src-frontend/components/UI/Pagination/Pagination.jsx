/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-key */
import React from "react";

import { usePagination, DOTS } from "hooks";
import {
  PaginationItem,
  PaginationLink,
  Pagination as PaginationStrap,
} from "reactstrap";

export const Pagination = (props) => {
  const {
    isLoading = false,
    onPageChange,
    totalCount,
    siblingCount = 3,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onSelectPage = (e) => {
    onPageChange(parseInt(e.target.value, 10));
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="mt-2">
      <PaginationStrap>
        <PaginationItem disabled={currentPage === 1 || isLoading}>
          <PaginationLink onClick={() => onPageChange(1)} first />
        </PaginationItem>
        <PaginationItem disabled={currentPage === 1 || isLoading}>
          <PaginationLink onClick={onPrevious} previous />
        </PaginationItem>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <PaginationLink key={index}>&#8230;</PaginationLink>;
          }

          return (
            <PaginationItem
              key={index}
              disabled={isLoading}
              active={pageNumber === currentPage}
            >
              <PaginationLink onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem disabled={currentPage === lastPage || isLoading}>
          <PaginationLink onClick={onNext} next />
        </PaginationItem>
        <PaginationItem disabled={currentPage === lastPage || isLoading}>
          <PaginationLink onClick={() => onPageChange(lastPage)} last />
        </PaginationItem>
      </PaginationStrap>

      <select className="me-2" onChange={onSelectPage} value={currentPage}>
        {paginationRange.map((pageNumber, index) => (
          <option key={index} value={pageNumber}>
            {pageNumber}
          </option>
        ))}
      </select>

      <span>
        Page:{" "}
        <span>
          {currentPage} / {lastPage}
        </span>{" "}
        of {totalCount} items
      </span>
    </div>
  );
};
