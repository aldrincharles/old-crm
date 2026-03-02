/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import React from "react";
import styled from "styled-components";
import {
  useTable,
  useSortBy,
  useRowSelect,
  useBlockLayout,
  useExpanded,
} from "react-table";

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
      overflow: auto;
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

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const defaultPropGetter = () => ({});

export const SimpleTable = ({
  // isLoading = false,
  columns,
  data,
  properties: { height = "auto", selectable = false },
  renderRowSubComponent,
  onSelectRows = defaultPropGetter,
  onHeaderClick = defaultPropGetter,
  updateMyData = defaultPropGetter,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 35,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      updateMyData,
      defaultColumn,
      manualSortBy: true,
    },
    useSortBy,
    useExpanded,
    useRowSelect,
    useBlockLayout,
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
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
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

  React.useEffect(() => {
    onSelectRows(selectedFlatRows.map((d) => d.original));
  }, [onSelectRows, selectedFlatRows]);

  return (
    <Styles>
      <div
        {...getTableProps()}
        className="table sticky"
        style={{ height: height }}
      >
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  onClick={() => onHeaderClick(column)}
                  className="th"
                >
                  <span>{column.render("Header")}</span>
                  <span>
                    {column.sortDirection === "ASC"
                      ? " 🔼"
                      : column.sortDirection === "DESC"
                      ? " 🔽"
                      : null}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} className="body">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <React.Fragment key={i}>
                <div className="tr" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <div
                        {...cell.getCellProps([
                          {
                            className: `td ${cell.column.className}`,
                          },
                        ])}
                      >
                        {cell.render("Cell")}
                      </div>
                    );
                  })}
                </div>

                {row.isExpanded ? renderRowSubComponent({ row }) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </Styles>
  );
};
