import React, { useMemo } from "react";

import { Button, ButtonGroup } from "reactstrap";

import { BarLoaderSpinner, SimpleTable } from "components";
import { OrganizationStrategyEdit } from "./OrganizationStrategyEdit";
import { OrganizationStrategyCriteria } from "./OrganizationStrategyCriteria";

const OrganizationStrategyDisplay = ({ data, isLoading, onEdit, onDelete }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "info.title",
      },
      {
        Header: "Strategy Summary",
        accessor: "info.summary",
        Cell: ({ row }) => {
          let original = row.original;
          return (
            <div style={{ textAlign: "left" }}>{original.info.summary}</div>
          );
        },
      },
      {
        Header: "Remarks",
        accessor: "info.remarks",
        Cell: ({ row }) => {
          let original = row.original;
          return (
            <div style={{ textAlign: "left" }}>{original.info.remarks}</div>
          );
        },
      },
      {
        Header: () => null,
        id: "edit",
        width: 35,
        Cell: ({ row }) => {
          let original = row.original;
          return (
            <ButtonGroup>
              <OrganizationStrategyCriteria rowID={original.id} />
              <OrganizationStrategyEdit
                rowID={original.id}
                info={original.info}
                criteria={original.criteria}
                onEdit={onEdit}
              />
              <Button
                color="danger"
                onClick={() => {
                  onDelete(original.id);
                }}
              >
                <i className="ion-trash-a" />
              </Button>
            </ButtonGroup>
          );
        },
      },
    ],
    [onDelete, onEdit]
  );

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <SimpleTable
        columns={columns}
        data={data}
        properties={{ height: "auto" }}
      />
    </>
  );
};

export { OrganizationStrategyDisplay };
