import React from "react";

import { ListItemEdit } from "./ListItemEdit";

export const ListItemDisplay = ({
  data,
  url,
  onRefetch = () => null,
  updateMyValue = () => null,
}) => {
  //process object to be evaluated on Main file
  const processObject = (index, id, value) => {
    updateMyValue(index, id, value);
  };

  return (
    <>
      {data?.length > 0 &&
        data?.map((c, i) => (
          <ul key={i}>
            <li>
              <ListItemEdit
                data={c}
                url={url}
                onProcessKeys={(e) => {
                  processObject(i, "item", e);
                }}
                onRefetch={onRefetch}
              />
            </li>
          </ul>
        ))}
    </>
  );
};
