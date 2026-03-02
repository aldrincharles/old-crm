/* eslint-disable react/display-name */
import React, { useMemo } from "react";

import { AnimatedSmartTable } from "components";

export const CDNoteArchiveDisplay = ({
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
        Header: "FILE NAME",
        id: "file",
        disableFilters: true,
        Cell: ({ row }) => {
          const { fileName, link } = row.original;
          return (
            <a target="_blank" rel="noreferrer" href={link}>
              {fileName}
            </a>
          );
        },
      },
      {
        Header: "UPLOADER",
        accessor: "uploader",
        disableFilters: true,
      },
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
