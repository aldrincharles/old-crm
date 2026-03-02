import React from "react";

export const SubCategoryDisplay = ({ data }) => {
  return (
    <>
      {data?.subcategories?.map((c, i) => (
        <ul style={{ textAlign: "left" }} key={i}>
          <li>{c.label}</li>
        </ul>
      ))}
    </>
  );
};
