import React, { useState } from "react";

import JSMasterlistMain from "./JSMasterlistMain";

const makeId = () => {
  let ID = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < 12; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;
};

export const JSMasterlistController = () => {
  const [dynamicInput, setDynamicInput] = useState([{ id: makeId() }]);

  const handleAddFields = () => {
    const values = [...dynamicInput];
    values.push({ id: makeId() });
    setDynamicInput(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...dynamicInput];
    values.splice(index, 1);
    setDynamicInput(values);
  };

  return (
    <>
      {dynamicInput.map((data, i) => (
        <div key={data.id}>
          <div style={{ textAlign: "left" }}>
            <button
              disabled={dynamicInput.length === 1}
              className="btn btn-link"
              type="button"
              onClick={() => handleRemoveFields(i)}
            >
              -
            </button>
            <button
              disabled={dynamicInput.length === 3}
              className="btn btn-link"
              type="button"
              onClick={() => handleAddFields()}
            >
              +
            </button>
          </div>
          <JSMasterlistMain index={i} />
        </div>
      ))}
    </>
  );
};
