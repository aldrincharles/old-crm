import React from "react";

export const CompetitorsDisplay = ({ data }) => {
  return (
    <>
      {data?.competitors.map((c, i) => (
        <ul style={{ textAlign: "left" }} key={i}>
          <li>{c.label}</li>
        </ul>
      ))}
    </>
  );
};
