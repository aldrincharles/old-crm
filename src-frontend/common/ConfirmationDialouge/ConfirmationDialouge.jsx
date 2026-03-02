import React from "react";

import { Button } from "reactstrap";

import { BootstrapModal } from "components";

export const ConfirmationDialouge = ({
  visible,
  toggle,
  isLoading = false,
  onConfirm = () => null,
}) => {
  return (
    <BootstrapModal isOpen={visible} toggle={toggle} backdrop="static">
      <BootstrapModal.Body>Are you sure?</BootstrapModal.Body>
      <BootstrapModal.Footer toggle={toggle}>
        <Button disabled={isLoading} color="success" onClick={onConfirm}>
          Proceed
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};
