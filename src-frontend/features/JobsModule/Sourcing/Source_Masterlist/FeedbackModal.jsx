import React from "react";
import { Button } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle } from "hooks";

export const FeedbackModal = ({ row, infoData }) => {
  const [visible, toggle] = useToggle();

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Open
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="xl">
        <BootstrapModal.Body>
          <iframe
            title="FeedbackModal"
            id={`${row.id}_Frame`}
            src={infoData}
            scrolling="auto"
            height="650"
            width="100%"
          />
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
      </BootstrapModal>
    </div>
  );
};
