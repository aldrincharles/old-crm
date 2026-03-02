import React from "react";

import PropTypes from "prop-types";
import { Modal } from "reactstrap";

import { Header } from "./Header";
import { Body } from "./Body";
import { Footer } from "./Footer";

export const BootstrapModal = ({
  isOpen = false,
  toggle = () => {},
  size,
  children,
  backdrop = true,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      size={size}
      centered
      backdrop={backdrop}
    >
      {children}
    </Modal>
  );
};

BootstrapModal.Header = Header;
BootstrapModal.Body = Body;
BootstrapModal.Footer = Footer;

BootstrapModal.propTypes = {
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  size: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
