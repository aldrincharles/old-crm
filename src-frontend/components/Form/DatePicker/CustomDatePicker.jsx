import "./datepicker.css";
import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import { getYear } from "date-fns";
import range from "lodash/range";

export const CustomDatePicker = ({
  name,
  selected = new Date(),
  onChange = () => {},
  dateFormat,
}) => {
  const years = range(1970, getYear(new Date()) + 1, 1);
  return (
    <DatePicker
      name={name}
      renderCustomHeader={({ date, changeYear }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
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
        </div>
      )}
      selected={selected}
      onChange={onChange}
      dateFormat={dateFormat}
      showMonthYearPicker
      showFullMonthYearPicker
      showFourColumnMonthYearPicker
    />
  );
};

CustomDatePicker.propTypes = {
  name: PropTypes.string,
  selected: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
};
