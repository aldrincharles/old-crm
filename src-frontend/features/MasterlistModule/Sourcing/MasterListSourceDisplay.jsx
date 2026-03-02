/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo, useState, useContext } from "react";
import { Button, Row, Col, ButtonGroup } from "reactstrap";
import { toast } from "react-toastify";

import { FetchContext } from "context/FetchContext";
import { FetchFilterContext, pageNext, pageSort } from "context/FetchFilter";
import { useAxiosPrivate } from "hooks";
import { BarLoaderSpinner, ErrorHandler, SimpleTable } from "components";
import { TextArea } from "components/UI/Table/TableFetch";
import { ContactInformation, GradingModal } from "common";

import { SalesProfile } from "./SalesProfile";
import { MasterListPreferences } from "./MasterListPreferences";
import { FeedbackModal } from "./FeedbackModal";
import { SubRowAsync } from "./SubRow/SubRowAsync";

export const MasterListSourceDisplay = () => {
  const authAxios = useAxiosPrivate();
  const [selectedRow, setSelectedRow] = useState([]);
  const { data, setData, retrieveData, error, isLoading } =
    useContext(FetchContext);
  const { state, dispatch } = useContext(FetchFilterContext);

  const columnHeaderClick = (column) => {
    switch (column.sortDirection) {
      case "none":
        dispatch(pageSort("ASC", column.id));
        break;
      case "ASC":
        dispatch(pageSort("DESC", column.id));
        break;
      case "DESC":
        dispatch(pageSort("none", column.id));
        break;
      default:
        return null;
    }
  };

  const handleDeleteSelectedRows = async () => {
    let listIDs = [];
    selectedRow.map((data) => {
      listIDs.push({ id: data.masterlistsourcing_id });
    });

    const response = authAxios.delete(`/masterlist`, {
      data: { masterlistsourcing_ids: listIDs },
    });

    try {
      await toast.promise(response, {
        pending: {
          render() {
            return "Pending";
          },
        },
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: {
          render() {
            return "Oops! Something went wrong 🤯";
          },
        },
      });
      if (state.page > 1) {
        dispatch(pageNext(1));
      } else {
        retrieveData();
      }
    } finally {
    }
  };

  const handleTableUpdate = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "contact.name",
        sticky: "left",
        width: 250,
        sortType: "basic",
        sortDirection:
          state.accessor === "contact.name" ? state.direction : "none",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "⬇️" : "➡️"} {row.original.contact.name}
          </span>
        ),
      },
      {
        Header: () => null,
        id: "contactInformation",
        sticky: "left",
        width: 30,
        disableFilters: true,
        Cell: ({ row: { original } }) => {
          return (
            <>
              <ContactInformation
                modal_contact_id={original.contact.id}
                shortcut_linked_in={original.contact.linked_in}
              />
            </>
          );
        },
      },
      {
        Header: "GENERAL GRADE",
        accessor: "general_verification_grade",
        sortType: "basic",
        width: 30,
        sortDirection:
          state.accessor === "general_verification_grade"
            ? state.direction
            : "none",
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          const { general_verification_grade, masterlistsourcing_id } =
            row.original;

          const handleUpdate = (data) => {
            updateMyData(index, id, data);
          };

          return (
            <GradingModal
              grading={general_verification_grade}
              onUpdateValues={handleUpdate}
              url={`/masterlist/${masterlistsourcing_id}/general-grade`}
            />
          );
        },
      },
      {
        Header: "Sales Profile",
        accessor: "contact.sales_profile",
        disableSortBy: true,
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          const handleOnChange = (data) => {
            updateMyData(index, id, data);
          };

          return <SalesProfile row={row} onUpdateValues={handleOnChange} />;
        },
      },
      {
        Header: "GENERAL COMMENT",
        accessor: "contact.general_comment",
        disableSortBy: true,
        Cell: ({ row, column: { id }, updateMyData }) => {
          const { index } = row;
          let original = row.original;

          const handleUpdate = (data) => {
            updateMyData(index, id, data);
          };

          return (
            <TextArea
              data={original.contact.general_comment}
              url={`/masterlist/${original.contact.id}/general-comment`}
              onUpdateValues={handleUpdate}
            />
          );
        },
      },
      {
        Header: () => null,
        id: "actionButtons",
        disableFilters: true,
        Cell: ({ row }) => {
          let original = row.original.contact;
          return (
            <ButtonGroup>
              <FeedbackModal label="CV" row={row} infoData={original.cv} />
              <FeedbackModal
                label="IV Notes"
                row={row}
                infoData={original?.interviews[0]?.file_name}
              />
              <MasterListPreferences data={row.original} />
            </ButtonGroup>
          );
        },
      },
    ],
    [state.accessor, state.direction]
  );

  const renderRowSubComponent = React.useCallback(({ row }) => {
    return <SubRowAsync row={row} />;
  }, []);

  if (error) return <ErrorHandler onRetry={retrieveData} />;

  return (
    <>
      <Row>
        <Col style={{ textAlign: "left" }}>
          <Button
            className="my-1"
            color="danger"
            disabled={!selectedRow.length > 0}
            onClick={handleDeleteSelectedRows}
          >
            Delete selected row
          </Button>
        </Col>
      </Row>
      {isLoading && <BarLoaderSpinner />}
      <SimpleTable
        columns={columns}
        data={data}
        properties={{ selectable: true, height: 600 }}
        updateMyData={handleTableUpdate}
        onSelectRows={setSelectedRow}
        onHeaderClick={columnHeaderClick}
        renderRowSubComponent={renderRowSubComponent}
        isLoading={isLoading}
      />
    </>
  );
};
