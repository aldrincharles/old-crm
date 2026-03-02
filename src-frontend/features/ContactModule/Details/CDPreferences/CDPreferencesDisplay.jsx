import React from "react";

import { Skeleton } from "components";
import { dateFormatter } from "utils";

export const CDPreferencesDisplay = ({ data, isLoading = true }) => {
  var date = data?.date_looking_to_move
    ? dateFormatter(data.date_looking_to_move, {
        month: "long",
        year: "numeric",
      })
    : null;

  const contents = [
    {
      name: "Date Looking to Move",
      content: date,
    },
    {
      name: "Type of Company",
      content: data?.type_of_company.label,
    },
    {
      name: "Position to Move Into",
      content: data?.position.label,
    },
    {
      name: "Industry",
      content: data?.industry.label,
    },
  ];

  return (
    <>
      {contents.map((c, i) => (
        <p key={i} className={isLoading ? null : "contact-item border-bottom"}>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <span className="fw-bold">{c.name}: </span>
              <span>{c.content}</span>
            </>
          )}
        </p>
      ))}
    </>
  );
};
