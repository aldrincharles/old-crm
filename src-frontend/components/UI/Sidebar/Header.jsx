import React from "react";
import { OffcanvasHeader } from "reactstrap";

const Header = ({ toggle, children }) => {
  return <OffcanvasHeader toggle={toggle}>{children}</OffcanvasHeader>;
};

export default Header;
