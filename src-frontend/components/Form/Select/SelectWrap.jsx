import "./style/select.scss";
import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const SelectWrap = (props) => {
  return (
    <div className="select-wrapper-container">
      <Select {...props} classNamePrefix="select-wrapper" />
    </div>
  );
};

SelectWrap.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
  ]),
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export { SelectWrap };
