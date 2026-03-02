import React, { useState } from "react";

import { Button } from "reactstrap";

import { useToggle } from "hooks";
import { BootstrapModal } from "components";

import { ContainerTemplateAdd } from "./ContainerTemplateAdd";
import { ContainerCustomAdd } from "./ContainerCustomAdd";
import { RadioOption } from "./form/RadioOption";

const SearchStrategiesAdd = () => {
  const [visible, toggle] = useToggle();
  return (
    <>
      <Button color="primary" onClick={toggle} className="no-print">
        <i className="ion-plus-circled" />
      </Button>
      <ComponentDialogue visible={visible} toggle={toggle} />
    </>
  );
};

const ComponentDialogue = React.memo(({ visible, toggle }) => {
  const [value, setValue] = useState("Template");

  const FORM_TYPES = {
    Template: <ContainerTemplateAdd toggle={toggle} />,
    Custom: <ContainerCustomAdd toggle={toggle} />,
  };

  const FormType = ({ type }) => {
    return <>{FORM_TYPES[type]}</>;
  };

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
      <BootstrapModal.Header>Add</BootstrapModal.Header>
      <BootstrapModal.Body>
        <RadioOption value={value} setValue={setValue} />
        <FormType type={value} />
      </BootstrapModal.Body>

      <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
    </BootstrapModal>
  );
});

export { SearchStrategiesAdd };
