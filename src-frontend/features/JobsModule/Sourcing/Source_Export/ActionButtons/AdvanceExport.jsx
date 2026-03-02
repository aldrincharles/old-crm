import PropTypes from "prop-types";
import React, { useState } from "react";

import { Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router";

import { useAxiosPrivate, useMountedState, useToggle } from "hooks";
import { AsyncSelectWrap, BootstrapModal } from "components";

const AdvanceExport = ({ onRefetch = () => null }) => {
  const [visible, toggle] = useToggle();
  return (
    <>
      <Button color="primary" outline onClick={toggle}>
        <i className="ion-android-desktop" /> Auto Export
      </Button>
      <ComponentDialogue
        onRefetch={onRefetch}
        visible={visible}
        toggle={toggle}
      />
    </>
  );
};

const ComponentDialogue = React.memo(({ onRefetch, visible, toggle }) => {
  const { id } = useParams();
  const mountedRef = useMountedState();
  const authAxios = useAxiosPrivate();

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    toggle();
    const currentToaster = toast.loading("Please wait...");

    const response = await authAxios.post(`/sourcing/advance-export/${id}`, {
      strategy: value,
    });
    const taskID = response.data.task_id;
    getStatus(taskID, currentToaster);
  };

  const getStatus = async (taskID, currentToaster) => {
    try {
      const response = await authAxios.get(
        `/sourcing/advance-export/${taskID}`
      );
      const status = response.data.status_state;
      const data = response.data.content;

      if (status === "SUCCESS") {
        onRefetch();
        toast.update(currentToaster, {
          render: "Advance Export success 👌",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          progress: 0,
        });
        setIsLoading(false);
      } else if (
        (status === "PENDING" || status === "PROGRESS") &&
        mountedRef()
      ) {
        toast.update(currentToaster, {
          render: (
            <>
              <div>Export Strategy {data.current_strategy}</div>
              <div>{Math.round(data.progress * 100)}% Please wait...</div>
            </>
          ),
          type: "default",
          isLoading: true,
          progress: data.progress,
        });
        setTimeout(function () {
          getStatus(taskID, currentToaster);
        }, 1000);
      }
    } catch (error) {
      toast.update(currentToaster, {
        render: "Oops! Something went wrong 🤯",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        progress: 0,
      });
      setIsLoading(false);
    }
  };

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="sm">
      <BootstrapModal.Header>Advance Export</BootstrapModal.Header>

      <BootstrapModal.Body>
        <Form id="AdvanceExport" onSubmit={onSubmit}>
          <AsyncSelectWrap
            name="search_strategies"
            dependencies={{
              url: "/parameters",
              topic: "search_strategies",
              id: id,
            }}
            value={value}
            onChange={setValue}
            isMulti
            required
          />
        </Form>
      </BootstrapModal.Body>

      <BootstrapModal.Footer toggle={toggle}>
        <Button
          disabled={isLoading}
          color="success"
          form="AdvanceExport"
          type="submit"
        >
          Submit
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
});

AdvanceExport.propTypes = {
  onRefetch: PropTypes.func.isRequired,
};

export { AdvanceExport };
