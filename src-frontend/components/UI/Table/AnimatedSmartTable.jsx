/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import styled from "styled-components";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useFilters,
  useBlockLayout,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { motion, AnimatePresence } from "framer-motion";
import { Row, Col, Button, Input } from "reactstrap";
import {
  Filter,
  GlobalFilter,
  IndeterminateCheckbox,
  GenerateSortingIndicator,
  DefaultColumnFilter,
} from "./Addons";

const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  .table {
    // border: 1px solid #ddd;

    .tr {
      min-width: 100%;
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      padding: 5px;
      // border-bottom: 1px solid #ddd;
      // border-right: 1px solid #ddd;
      background-color: #fff;
      // background-color: #00FFFF;

      overflow: hidden;

      :last-child {
        border-right: 0;
      }

      :not([data-sticky-td]) {
        flex-grow: 1;
      }

      .resizer {
        display: inline-block;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;

        &.isResizing {
          background: red;
        }
      }
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
        min-width: 100%;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }
  }
`;
const defaultPropGetter = () => ({});

export const AnimatedSmartTable = ({
  columns,
  data,
  currentPageIndex = 0,
  currentPageSize = 10,
  hiddenColumns = [""],
  selectable = false,
  paginated = false,
  overflow = false,
  updateMyData = () => {},
  fetchData = () => {},
  onSelectRows = () => {},
  onSelectedDelete = () => {},
  getCellProps = defaultPropGetter,
}) => {
  const spring = React.useMemo(
    () => ({
      type: "spring",
      damping: 50,
      stiffness: 100,
    }),
    []
  );
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      minWidth: 35,
      width: 150,
      maxWidth: 400,
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,

    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: currentPageIndex,
        pageSize: currentPageSize,
        hiddenColumns: hiddenColumns,
      },
      autoResetPage: false,
      autoResetFilters: false,
      autoResetSortBy: false,
      updateMyData,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useBlockLayout,
    useSticky,
    (hooks) => {
      if (selectable) {
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: "selection",
            minWidth: 35,
            width: 35,
            maxWidth: 35,
            sticky: "left",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  useEffect(() => {
    if (page.length === 0) {
      gotoPage(pageIndex - 1);
    }

    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize, globalFilter, page.length, gotoPage]);

  useEffect(() => {
    if (selectedFlatRows.length > 0) {
      onSelectRows(selectedFlatRows.map((d) => d.original));
      return;
    }

    onSelectRows([]);
  }, [onSelectRows, selectedFlatRows]);

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  // Workaround as react-table footerGroups doesn't provide the same internal data than headerGroups
  // const footerGroups = headerGroups.slice().reverse();

  return (
    <>
      <Row
        style={{
          margin: "0 auto",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {selectable && (
          <Col className="d-flex justify-content-start mb-2">
            <Button
              color="danger"
              onClick={onSelectedDelete}
              disabled={!selectedFlatRows.length > 0}
            >
              Remove Selected
            </Button>
          </Col>
        )}
        <Col md={4}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Col>
      </Row>
      <Styles>
        <div
          {...getTableProps()}
          className="table sticky"
          style={{ height: overflow ? "auto" : 400 }}
        >
          <div className="header">
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <motion.div
                    {...column.getHeaderProps({
                      layoutTransition: spring,
                      style: {
                        minWidth: column.minWidth,
                      },
                    })}
                    className="th"
                  >
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {GenerateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {paginated ? (
            <div {...getTableBodyProps()} className="body">
              <AnimatePresence>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <motion.div
                      {...row.getRowProps({
                        layoutTransition: spring,
                        exit: { opacity: 0, maxHeight: 0 },
                      })}
                      className="tr"
                    >
                      {row.cells.map((cell) => {
                        return (
                          <motion.div
                            {...cell.getCellProps([
                              {
                                layoutTransition: spring,
                                className: `td ${cell.column.className}`,
                              },
                              getCellProps(cell),
                            ])}
                          >
                            {cell.render("Cell")}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div {...getTableBodyProps()} className="body">
              <AnimatePresence>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <motion.div
                      {...row.getRowProps({
                        layoutTransition: spring,
                        exit: { opacity: 0, maxHeight: 0 },
                      })}
                      className="tr"
                    >
                      {row.cells.map((cell) => {
                        return (
                          <motion.div
                            {...cell.getCellProps([
                              {
                                layoutTransition: spring,
                                className: `td ${cell.column.className}`,
                              },
                              getCellProps(cell),
                            ])}
                          >
                            {cell.render("Cell")}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* <div className="footer">
            {footerGroups.map((footerGroup) => (
              <div {...footerGroup.getHeaderGroupProps()} className="tr">
                {footerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className="td">
                    {column.render("Footer")}
                  </div>
                ))}
              </div>
            ))}
          </div> */}
        </div>
      </Styles>
      {paginated ? (
        <>
          <Row
            style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}
          >
            <Col md={3}>
              <Button
                color="primary"
                onClick={() => {
                  gotoPage(0);
                }}
                disabled={!canPreviousPage}
              >
                {"<<"}
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  previousPage();
                }}
                disabled={!canPreviousPage}
              >
                {"<"}
              </Button>
            </Col>
            <Col md={2} style={{ marginTop: 7 }}>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </Col>
            <Col md={2}>
              <Input
                type="number"
                min={1}
                style={{ width: 70 }}
                max={pageOptions.length}
                value={pageIndex + 1}
                onChange={onChangeInInput}
              />
            </Col>
            <Col md={2}>
              <Input
                id={`table-page-size`}
                type="select"
                value={pageSize}
                onChange={onChangeInSelect}
              >
                {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </Input>
            </Col>
            <Col md={3}>
              <Button
                color="primary"
                onClick={() => {
                  nextPage();
                }}
                disabled={!canNextPage}
              >
                {">"}
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  gotoPage(pageCount - 1);
                }}
                disabled={!canNextPage}
              >
                {">>"}
              </Button>
            </Col>
          </Row>
          <span>
            Showing{" "}
            <span>
              {pageIndex * pageSize + 1}-
              {(pageIndex + 1) * pageSize - (pageSize - page.length)}
            </span>{" "}
            of {preGlobalFilteredRows.length} items
          </span>
        </>
      ) : null}
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  );
};
