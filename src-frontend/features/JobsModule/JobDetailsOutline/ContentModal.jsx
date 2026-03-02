import React from "react";

import { Button, Card } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle } from "hooks";

const ContentModal = ({ contactName, title, content }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button
        style={{ textAlign: "left" }}
        className="my-1"
        color="info"
        onClick={toggle}
      >
        <i className="ion-eye me-3"></i>
        {title}
      </Button>
      {visible ? (
        <DisplayContent
          title={`${contactName} - ${title}`}
          content={content}
          visible={visible}
          toggle={toggle}
        />
      ) : null}
    </>
  );
};

const DisplayContent = ({ title, content, visible, toggle }) => {
  return (
    <>
      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>{title}</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Card style={{overflowY:"auto"}}>
            <div>{content}</div>
          </Card>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
export { ContentModal };
