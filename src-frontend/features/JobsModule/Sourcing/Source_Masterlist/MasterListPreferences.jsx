import React from "react";

import { Button } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle } from "hooks";
import { dateFormatter } from "utils";

export const MasterListPreferences = ({ data }) => {
  const [visible, toggle] = useToggle();

  const contents = [
    {
      name: "Date Looking to Move",
      content: data.looking_to_move
        ? dateFormatter(data.looking_to_move, {
            month: "long",
            year: "numeric",
          })
        : null,
    },
    {
      name: "Type of Company",
      content: data.type_of_company,
    },
    {
      name: "Position to Move Into",
      content: data.position,
    },
    {
      name: "Industry",
      content: data.industry,
    },
  ];

  return (
    <>
      <Button color="primary" disabled={!data.looking_for} onClick={toggle}>
        Open
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="sm">
        <BootstrapModal.Header>Preferences</BootstrapModal.Header>
        <BootstrapModal.Body>
          {contents.map((c) => (
            <React.Fragment key={c.name}>
              <span className="fw-bold">{c.name}: </span>
              <p key={c.name}>{c.content}</p>
            </React.Fragment>
          ))}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
