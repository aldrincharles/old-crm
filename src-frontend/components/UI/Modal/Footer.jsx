import React from "react";

import PropTypes from "prop-types";
import { ModalFooter, Button } from "reactstrap";

export const Footer = ({ children, toggle = () => {} }) => {
  return (
    <ModalFooter>
      {children}
      <Button onClick={toggle}>Close</Button>
    </ModalFooter>
  );
};

Footer.propTypes = {
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
