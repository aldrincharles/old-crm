/* eslint-disable react/display-name */
import _ from "lodash";
import React, { useMemo } from "react";

import { Badge } from "reactstrap";
import { Link } from "react-router-dom";

import { SelectColumnFilter } from "components/UI/Table/Addons";
import { AnimatedSmartTable } from "components";

export const MasterListDisplay = ({ data = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: "TITLE",
        accessor: "title",
        Cell: ({ row: { original } }) => {
          return <Link to={`${original.masterlist_id}`}>{original.title}</Link>;
        },
      },
      {
        Header: "POSITION",
        accessor: "position.label",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "INDUSTRY",
        accessor: "industry.label",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "LOCATION",
        accessor: "location.label",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "SALES SPECIALIZATIONS",
        accessor: (data) => {
          const output = [];
          _.map(data.sales_specializations, (specialization) => {
            output.push(specialization.label);
          });
          return output.join(", ");
        },
        Cell: ({ row: { original } }) => {
          return (
            <>
              {original.sales_specializations.map((specialization) => (
                <Badge className="me-2" color="info" key={specialization.value}>
                  {specialization.label}
                </Badge>
              ))}
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <AnimatedSmartTable columns={columns} data={data} />
    </>
  );
};
