/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { AnimatedSmartTable } from "components";

export const CDCommentsDisplay = ({
  data,
  setSelectedRow = () => null,
  onDelete = () => null,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "DATE",
        accessor: "date",
        disableFilters: true,
      },
      {
        Header: "COMMENT",
        accessor: "comment",
        disableFilters: true,
      },
      {
        Header: "AUTHOR",
        accessor: "author",
        disableFilters: true,
      },
      // {
      //   Header: () => null,
      //   id: "delete",
      //   Cell: ({ row }) => {
      //     const { comment_id } = row.original;
      //     return (
      //       <>
      //         <Button
      //           color="danger"
      //           onClick={() => {
      //             onDelete(comment_id);
      //           }}
      //         >
      //           Delete
      //         </Button>
      //       </>
      //     );
      //   },
      // },
    ],
    []
  );

  return (
    <>
      <AnimatedSmartTable
        data={data || []}
        columns={columns}
        onSelectRows={setSelectedRow}
        onSelectedDelete={onDelete}
        paginated
        selectable
      />
    </>
  );
};
