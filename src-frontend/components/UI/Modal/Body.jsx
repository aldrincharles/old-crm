import React from "react";

import PropTypes from "prop-types";
import { ModalBody } from "reactstrap";

export const Body = ({ children }) => {
  return <ModalBody>{children}</ModalBody>;
};

Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
