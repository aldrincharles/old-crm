import React from "react";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { BootstrapModal, SelectWrap } from "components";
import { useToggle, useAxiosPrivate } from "hooks";
import { gradingColor, gradingOption } from "constants";

const convertData = {
  1: ["gold"],
  2: ["silver"],
  3: ["bronze"],
  4: ["callout"],
  5: ["pending"],
  6: ["skip"],
  7: ["rejected"],
  8: ["linked_in"],
};

export const GradingModal = ({ grading, url, onUpdateValues = () => {} }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }}>
        <span
          style={{ cursor: "pointer" }}
          onClick={toggle}
          className={`badge ${gradingColor[grading][0]}`}
        >
          {gradingColor[grading][1]}
        </span>
      </motion.div>
      <DialogueComponent
        visible={visible}
        toggle={toggle}
        grading={grading}
        url={url}
        onUpdateValues={onUpdateValues}
      />
    </>
  );
};

const DialogueComponent = React.memo(
  ({ visible, toggle, grading, url, onUpdateValues = () => {} }) => {
    const authAxios = useAxiosPrivate();

    const handleOnChange = async (event) => {
      try {
        toast.promise(
          authAxios.post(url, {
            grading: event.value,
          }),
          {
            pending: "Pending",
            success: {
              render({ data }) {
                const message = data.data?.message;
                return `${message} 👌`;
              },
            },
            error: "Oops! Something went wrong 🤯",
          }
        );

        onUpdateValues(convertData[event.value][0]);
        toggle();
      } catch (error) {}
    };

    return (
      <>
        <BootstrapModal size="sm" isOpen={visible} toggle={toggle}>
          <BootstrapModal.Header>Change Grading</BootstrapModal.Header>
          <BootstrapModal.Body>
            <SelectWrap
              name="grading"
              value={{ label: grading, value: grading }}
              options={gradingOption}
              onChange={(event) => handleOnChange(event)}
              isSearchable
            />
          </BootstrapModal.Body>
          <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
        </BootstrapModal>
      </>
    );
  }
);
