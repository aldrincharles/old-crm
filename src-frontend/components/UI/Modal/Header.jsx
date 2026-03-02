import React from "react";

import PropTypes from "prop-types";
import { ModalHeader } from "reactstrap";

export const Header = ({ children }) => {
  return <ModalHeader>{children}</ModalHeader>;
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
