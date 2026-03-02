import React from "react";
import { Navbar, NavbarText } from "reactstrap";

const Footer = () => {
  return (
    <>
      <Navbar
        light
        className="shadow p-2 mt-5 bg-white rounded"
        expand="md"
        fixed="bottom"
      >
        <NavbarText>
          iTel International Version 6.1.2. Copyright 2019. &copy; All Rights
          Reserved.
        </NavbarText>
      </Navbar>
    </>
  );
};

export { Footer };
