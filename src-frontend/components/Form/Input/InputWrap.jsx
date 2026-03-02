import React from "react";
import PropTypes from "prop-types";

import { Input } from "reactstrap";

const InputWrap = (props) => {
  return <Input {...props} />;
};

InputWrap.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  rel: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  accept: PropTypes.string,
  cols: PropTypes.string,
  rows: PropTypes.string,

  required: PropTypes.bool,

  maxLength: PropTypes.number,

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  onChange: PropTypes.func,
  onblur: PropTypes.func,
  onClick: PropTypes.func,
};

export { InputWrap };
