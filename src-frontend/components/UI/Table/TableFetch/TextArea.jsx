import React, { useState, useEffect } from "react";

import { Input } from "reactstrap";
import { useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

const TextArea = ({ data, url, onUpdateValues = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const [userInput, setUserInput] = useState(data);

  useEffect(() => {
    setUserInput(data);
  }, [data]);

  const onChange = (event) => {
    setUserInput(event);
  };

  const onBlur = async () => {
    try {
      const response = authAxios.put(url, {
        value: userInput,
      });

      toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });

      onUpdateValues(userInput);
    } catch (error) {}
  };

  return (
    <Input
      type="textarea"
      value={userInput || ""}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onBlur={onBlur}
    />
  );
};

export { TextArea };
