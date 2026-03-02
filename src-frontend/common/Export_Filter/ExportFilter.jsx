import React from "react";

import PropTypes from "prop-types";
import { Input, Card, CardBody, Row, Col } from "reactstrap";
import { motion, AnimatePresence } from "framer-motion";

import { CustomDatePicker, SelectWrap, AsyncSelectWrap } from "components";
import { exportFilterOption, InputType } from "constants";

export const ExportFilter = ({
  data = [],
  setData = () => null,
  onAddFields = () => null,
  onRemoveFields = () => null,
}) => {
  const handleOnChange = (index, name, e) => {
    const values = [...data];

    values[index][name] = e ? e : "";
    setData(values);
  };

  const handleOnTypeSelect = (index, event) => {
    const values = [...data];
    values[index]["inputType"] = event;
    values[index]["data"] = "";
    setData(values);
  };

  return (
    <Card className="mt-4">
      <CardBody>
        <AnimatePresence>
          {data.map((inputField, index) => (
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
                    options={exportFilterOption}
                    onChange={(event) => handleOnTypeSelect(index, event)}
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
                    handleOnChange={handleOnChange}
                  />
                </Col>
              </Row>
              <div>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => onRemoveFields(index)}
                >
                  -
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => onAddFields()}
                >
                  +
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {data.length === 0 && (
          <div>Click the Add Filter button to add a field</div>
        )}
      </CardBody>
    </Card>
  );
};

const FilterInput = ({
  dependencies: { inputType, topic, index },
  value,
  handleOnChange = () => null,
}) => {
  if (inputType === InputType.TEXT) {
    return (
      <Input
        name={`data_${index}`}
        type="text"
        maxLength={40}
        value={value}
        onChange={(event) => handleOnChange(index, "data", event.target.value)}
        placeholder="Place text here..."
        required
      />
    );
  } else if (inputType === InputType.DATE) {
    return (
      <CustomDatePicker
        name={`data_${index}`}
        selected={value || new Date()}
        onChange={(date) => {
          handleOnChange(index, "data", date);
        }}
        dateFormat="MMMM yyyy"
      />
    );
  } else if (inputType === InputType.NUMBER) {
    return (
      <Input
        name={`data_${index}`}
        type="number"
        value={value}
        onChange={(event) => handleOnChange(index, "data", event.target.value)}
        placeholder="Place number here..."
        required
      />
    );
  } else if (inputType === InputType.SINGLE) {
    return (
      <AsyncSelectWrap
        name={`data_${index}`}
        dependencies={{ url: "/parameters", topic: topic }}
        value={value}
        onChange={(event) => handleOnChange(index, "data", event)}
        required
      />
    );
  } else if (inputType === InputType.MULTI) {
    return (
      <AsyncSelectWrap
        name={`data_${index}`}
        dependencies={{ url: "/parameters", topic: topic }}
        value={value}
        onChange={(event) => handleOnChange(index, "data", event)}
        isMulti
        required
      />
    );
  } else {
    return null;
  }
};

ExportFilter.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  onAddFields: PropTypes.func.isRequired,
  onRemoveFields: PropTypes.func.isRequired,
};
