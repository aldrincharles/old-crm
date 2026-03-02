import "./datepicker.css";
import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import range from "lodash/range";

export const CustomHeaderDatePicker = ({
  name,
  selected = new Date(),
  onChange = () => {},
  dateFormat,
}) => {
  const years = range(1970, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            {">"}
          </button>
        </div>
      )}
      name={name}
      selected={selected}
      onChange={onChange}
      dateFormat={dateFormat}
    />
  );
};

CustomHeaderDatePicker.propTypes = {
  name: PropTypes.string,
  selected: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
};
