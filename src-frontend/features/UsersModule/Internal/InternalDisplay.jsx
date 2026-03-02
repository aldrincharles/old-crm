/* eslint-disable array-callback-return */
/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { AnimatedSmartTable } from "components";
import { SelectColumnFilter } from "components/UI/Table/Addons";
import { EditInternalUsers } from "./EditInternalUsers";
import { ResetMyPassword } from "./ResetMyPassword";

export const InternalDisplay = ({ data, onUpdateValues = () => null }) => {
  const columns = useMemo(
    () => [
      {
        Header: "E-MAIL",
        accessor: "e-mail",
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
        Header: "ROLE",
        accessor: "role.label",
        Filter: SelectColumnFilter,
        filter: "equals",
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
              <EditInternalUsers
                setData={proccessKeys}
                data={{
                  user_id: original.user_id,
                  firstName: original.first_name,
                  lastName: original.last_name,
                  role: original.role,
                }}
              />
              <ResetMyPassword
                url={`/users/${original.user_id}/reset-password`}
              />
            </>
          );
        },
      },
    ],
    []
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
