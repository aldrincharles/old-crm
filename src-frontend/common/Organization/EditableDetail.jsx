/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { Input } from "reactstrap";
import { toast } from "react-toastify";

import { Editable } from "components";
import { useAxiosPrivate } from "hooks";

export const EditableDetail = ({ url, title, keyVar = "paragraph_input" }) => {
  const authAxios = useAxiosPrivate();
  const [value, setValue] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await authAxios.get(url);
      const result = response.data;
      setValue(result.content[keyVar]);
    };

    getData();
  }, [url]);

  const onHandleBlur = async () => {
    const response = authAxios.post(url, {
      [keyVar]: value,
    });

    try {
      await toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });
    } catch (error) {
      setValue("");
    }
  };

  return (
    <>
      <h4 className="mt-3">{title}</h4>
      <div className="px-4 pb-4">
        <Editable
          text={value}
          placeholder={`Description for ${title}`}
          type="textarea"
          onBlur={onHandleBlur}
        >
          <Input
            autoFocus
            type="textarea"
            placeholder={`Description for ${title}`}
            rows="5"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Editable>
      </div>
    </>
  );
};
