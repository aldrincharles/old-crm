/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { AnimatedSmartTable } from "components";
import { SelectColumnFilter } from "components/UI/Table/Addons";
import { EditClientUser } from "./EditClientUser";

export const ClientUserDisplay = ({
  data,
  onUpdateValues = () => null,
  onRefetch = () => null,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "ORGANIZATION",
        accessor: "organization",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "FIRST NAME",
        accessor: "first_name",
      },
      {
        Header: "LAST NAME",
        accessor: "last_name",
      },
      {
        Header: "ID KEY",
        accessor: "id_key",
        disableFilters: true,
      },
      {
        Header: () => null,
        id: "settings",
        disableFilters: true,
        Cell: ({ row, updateMyData }) => {
          const { index, original } = row;

          const proccessKeys = (data) => {
            Object.keys(data).map((key) => {
              updateMyData(index, key, data[key]);
            });
          };

          return (
            <>
              <EditClientUser
                data={{
                  client_id: original.client_id,
                  organization: original.organization,
                  firstName: original.first_name,
                  lastName: original.last_name,
                  jobs: original.jobs,
                }}
                setData={proccessKeys}
                onRefetch={onRefetch}
              />
            </>
          );
        },
      },
    ],
    [onRefetch]
  );

  return (
    <>
      <AnimatedSmartTable
        data={data || []}
        columns={columns}
        updateMyData={onUpdateValues}
      />
    </>
  );
};
