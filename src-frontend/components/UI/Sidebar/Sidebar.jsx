import React from "react";
import PropTypes from "prop-types";

import { Offcanvas } from "reactstrap";

import Header from "./Header";
import Body from "./Body";

const Sidebar = ({
  isOpen = false,
  toggle = () => {},
  direction,
  children,
}) => {
  return (
    <Offcanvas isOpen={isOpen} toggle={toggle} direction={direction}>
      {children}
    </Offcanvas>
  );
};

Sidebar.Header = Header;
Sidebar.Body = Body;
export { Sidebar };

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  direction: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
