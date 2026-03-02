import React from "react";

export const CDLinkedinConnectionsDisplay = ({ data }) => {
  return (
    <>
      {data?.connections?.map((c, i) => (
        <ul key={i}>
          <li>{c.label}</li>
        </ul>
      ))}
    </>
  );
};
