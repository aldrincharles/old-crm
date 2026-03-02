import React, { useState, useEffect } from "react";

import { Input } from "reactstrap";
import { useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

const DropDown = ({ data, options = [], url, onUpdateValues = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const [userInput, setUserInput] = useState(data);

  useEffect(() => {
    setUserInput(data);
  }, [data]);

  const handleOnChange = async (event) => {
    try {
      const response = authAxios.put(url, {
        value: event,
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

      setUserInput(event);
      onUpdateValues(event);
    } catch (error) {}
  };

  return (
    <Input
      type="select"
      value={userInput}
      onChange={(e) => {
        handleOnChange(e.target.value);
      }}
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </Input>
  );
};

export { DropDown };
