import React from "react";

import { Col, Row } from "reactstrap";
import { AnimatePresence, motion } from "framer-motion";

import { AsyncSelectWrap, SelectWrap } from "components";
import { InputType } from "constants";

import { categoryOptions } from "../options/options";

const CriteriaForm = ({ criteria, setCriteria }) => {
  const addFields = () => {
    const values = [...criteria];
    values.push({ inputType: "" });
    setCriteria(values);
  };

  const removeFields = (index) => {
    const values = [...criteria];
    values.splice(index, 1);
    setCriteria(values);
  };

  const updateFields = (index, name, e) => {
    const values = [...criteria];

    values[index][name] = e ? e : "";
    setCriteria(values);
  };

  const onTypeSelect = (index, event) => {
    const values = [...criteria];
    values[index]["inputType"] = event;
    values[index]["data"] = "";
    setCriteria(values);
  };

  return (
    <>
      <AnimatePresence>
        {criteria.map((inputField, index) => (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            key={`${inputField}~${index}`}
          >
            <Row>
              <Col xs="6">
                <SelectWrap
                  id={`select_type_${index}`}
                  name={`select_type_${index}`}
                  value={inputField.inputType || ""}
                  options={categoryOptions}
                  onChange={(event) => onTypeSelect(index, event)}
                  required
                />
              </Col>
              <Col key={inputField.inputType.value} xs="6">
                <FilterInput
                  dependencies={{
                    inputType: inputField.inputType.type,
                    topic: inputField.inputType.value,
                    index: index,
                  }}
                  value={inputField.data}
                  updateFields={updateFields}
                />
              </Col>
            </Row>
            <div>
              <button
                disabled={criteria.length === 1}
                className="btn btn-link"
                type="button"
                onClick={() => removeFields(index)}
              >
                -
              </button>
              <button
                className="btn btn-link"
                type="button"
                onClick={() => addFields()}
              >
                +
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

const FilterInput = ({
  dependencies: { inputType, topic, index },
  value,
  updateFields = () => null,
}) => {
  if (inputType === InputType.SINGLE) {
    return (
      <AsyncSelectWrap
        name={`data_${index}`}
        dependencies={{ url: "/parameters", topic: topic }}
        value={value}
        onChange={(event) => updateFields(index, "data", event)}
        required
      />
    );
  } else if (inputType === InputType.MULTI) {
    return (
      <AsyncSelectWrap
        name={`data_${index}`}
        dependencies={{ url: "/parameters", topic: topic }}
        value={value}
        onChange={(event) => updateFields(index, "data", event)}
        isMulti
        required
      />
    );
  } else {
    return null;
  }
};

export { CriteriaForm };
