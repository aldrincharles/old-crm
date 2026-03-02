import React from "react";

import { FormGroup, Input, Label } from "reactstrap";

const ToggleComponents = ({ form, setForm, selectAll, setSelectAll }) => {
  const onClick = (id) => {
    const objCopy = [...form];
    const formToUpdate = objCopy.find((car) => car.id === id);
    formToUpdate.active = !formToUpdate.active;

    if (!formToUpdate.active && selectAll) {
      handleSelectAll();
    }

    setForm(objCopy);

    let flag = true;
    for (let i = 0; i < form.length; i++) {
      flag = flag && form[i].active;
    }

    if (flag && !selectAll) {
      handleSelectAll();
    }
  };

  const handleSelectAll = () => {
    setSelectAll((prevState) => !prevState);
    setForm(form.map((prev) => ({ ...prev, active: !selectAll })));
  };

  return (
    <div style={{ textAlign: "left" }}>
      <FormGroup check>
        <Input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
        <Label check>{`${selectAll ? "De-select" : "Select"}`} All </Label>
      </FormGroup>
      {form?.map((data) => (
        <FormGroup key={data.id} check>
          <Input
            type="checkbox"
            checked={data.active}
            onChange={() => onClick(data.id)}
          />
          <Label check>{data.name}</Label>
        </FormGroup>
      ))}
    </div>
  );
};

export { ToggleComponents };
