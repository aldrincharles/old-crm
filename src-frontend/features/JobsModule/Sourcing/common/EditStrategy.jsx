import React from "react";

import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useParams } from "react-router";

import { useToggle, useAxiosPrivate } from "hooks";
import { BootstrapModal, AsyncSelectWrap } from "components";

export const EditStrategy = ({
  id: { contact_id, job_id },
  strategy,
  onUpdateValues = () => {},
}) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.5 }}
        className="icon-button"
        onClick={toggle}
      >
        {strategy}
      </motion.div>
      <DialogueComponent
        visible={visible}
        toggle={toggle}
        job_id={job_id}
        contact_id={contact_id}
        strategy={strategy}
        onUpdateValues={onUpdateValues}
      />
    </>
  );
};

const DialogueComponent = React.memo(
  ({
    visible,
    toggle,
    job_id,
    contact_id,
    strategy,
    onUpdateValues = () => {},
  }) => {
    const { id } = useParams();
    const authAxios = useAxiosPrivate();

    const handleOnChange = async (event) => {
      let value = event.value;

      const response = authAxios.post(
        `/change-strategy-index/${job_id}/${contact_id}`,
        {
          strategy: event.value,
        }
      );

      try {
        await toast.promise(response, {
          pending: {
            render() {
              return "Pending";
            },
          },
          success: {
            render({ data }) {
              const message = data.data?.message;
              return `${message} 👌`;
            },
          },
          error: {
            render() {
              return "Oops! Something went wrong 🤯";
            },
          },
        });
        onUpdateValues(value);
        toggle();
      } finally {
      }
    };

    return (
      <BootstrapModal size="sm" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>Change Strategy</BootstrapModal.Header>
        <BootstrapModal.Body>
          <AsyncSelectWrap
            name="search_strategies"
            dependencies={{
              url: "/parameters",
              topic: "search_strategies",
              id: id,
            }}
            value={{ label: strategy, value: strategy }}
            onChange={handleOnChange}
            required
          />
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
      </BootstrapModal>
    );
  }
);
