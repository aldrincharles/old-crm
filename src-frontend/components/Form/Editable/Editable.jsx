import React, { useState } from "react";
import "./Editable.css";

export const Editable = ({
  text,
  textAlign = "left",
  type,
  placeholder,
  children,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          style={{ textAlign: textAlign }}
          className={`editable-${type}`}
          onClick={() => setEditing(true)}
        >
          <span
            style={{ whiteSpace: "pre-line" }}
            className={`${text ? "text-black" : "text-secondary"}`}
          >
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </section>
  );
};
