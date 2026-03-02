import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { useAxiosPrivate } from "hooks";
import ReactDatePicker from "react-datepicker";

const DatePicker = ({ data, url, onUpdateValues = () => {} }) => {
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
    <ReactDatePicker
      selected={userInput || new Date()}
      onChange={(event) => handleOnChange(event)}
      dateFormat="MM/dd/yyyy"
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  );
};

export { DatePicker };
