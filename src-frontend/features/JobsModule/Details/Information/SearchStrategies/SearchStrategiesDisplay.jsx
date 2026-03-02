import React, { useContext, useState } from "react";

import { Button, ButtonGroup, Table } from "reactstrap";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import { useAxiosPrivate, useToggle } from "hooks";
import { dateFormatter } from "utils";
import { BootstrapModal } from "components";
import { SearchStrategiesContext } from "./context/SearchStrategiesContext";
import { SearchStrategiesEdit } from "./SearchStrategiesEdit/SearchStrategiesEdit";
import { SearchStrategiesCriteria } from "./SearchStrategiesCriteria";

const renderDates = (date) => {
  let dt = date
    ? dateFormatter(date, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";
  return dt;
};

const SearchStrategiesDisplay = () => {
  const { id } = useParams();
  const authAxios = useAxiosPrivate();
  const { data, refetch } = useContext(SearchStrategiesContext);
  const [visible, toggle] = useToggle();
  const [rowId, setRowId] = useState("");

  const handleConfirmation = (rowID) => {
    setRowId(rowID);
    toggle();
  };
  const handleOnDelete = async () => {
    const response = authAxios.delete(
      `/jobs/${id}/details/information/search-strategies`,
      {
        data: { id: rowId },
      }
    );
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
    toggle();
    refetch();
  };

  return (
    <>
      <BootstrapModal isOpen={visible} toggle={toggle} backdrop="static">
        <BootstrapModal.Header>Warning</BootstrapModal.Header>
        <BootstrapModal.Body>
          <p>Are you sure you want to delete strategy?</p>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            className="d-flex justify-content-end"
            color="danger"
            onClick={handleOnDelete}
          >
            Delete
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
      <Table borderless>
        <thead>
          <tr>
            <th>Index</th>
            <th>Summary of Strategy</th>
            <th>Date Started</th>
            <th>Date Finished</th>
            <th>Status</th>
            <th className="no-print"></th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data.map((searchStrategies, index) => (
              <tr key={index}>
                <td>{searchStrategies?.strategy_index}</td>

                <td style={{ textAlign: "left" }}>
                  {searchStrategies.strategy_export_criteria}
                </td>

                <td>{renderDates(searchStrategies?.date_started)}</td>

                <td>{renderDates(searchStrategies?.date_finished)}</td>

                <td>{searchStrategies?.status.label}</td>

                <td style={{ width: 100 }} className="no-print">
                  <ButtonGroup>
                    <SearchStrategiesCriteria
                      index={searchStrategies.strategy_index}
                      rowID={searchStrategies.id}
                    />
                    <SearchStrategiesEdit data={searchStrategies} />
                    <Button
                      color="danger"
                      onClick={() => {
                        handleConfirmation(searchStrategies.id);
                      }}
                    >
                      <i className="ion-trash-a" />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export { SearchStrategiesDisplay };
