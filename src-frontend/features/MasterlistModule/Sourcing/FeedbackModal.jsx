import React from "react";
import { Button } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle } from "hooks";

export const FeedbackModal = ({ label = "Open", row, infoData }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="primary" onClick={toggle}>
        {label}
      </Button>
      <Component
        row={row}
        infoData={infoData}
        visible={visible}
        toggle={toggle}
      />
    </>
  );
};

export const Component = React.memo(({ row, infoData, visible, toggle }) => {
  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="xl">
      <BootstrapModal.Body>
        <iframe
          title="MasterListFeedbackModal"
          id={`${row.id}_Frame`}
          src={infoData}
          height="650"
          width="100%"
        />
      </BootstrapModal.Body>
      <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
    </BootstrapModal>
  );
});
