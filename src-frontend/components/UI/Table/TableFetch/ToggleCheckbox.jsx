import React, { useState, useEffect } from "react";

import { Input } from "reactstrap";

import { useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

const ToggleCheckbox = ({ data, url, onUpdateValues = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const [userInput, setUserInput] = useState(data);

  useEffect(() => {
    setUserInput(data);
  }, [data]);

  const handleOnChange = async (event) => {
    try {
      const response = authAxios.post(url, {
        toggle_value: event,
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
      id="checkbox2"
      type="checkbox"
      checked={userInput}
      onChange={(e) => handleOnChange(e.target.checked)}
    />
  );
};

export { ToggleCheckbox };
