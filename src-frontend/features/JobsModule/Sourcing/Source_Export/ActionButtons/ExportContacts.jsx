import React, { useState } from "react";

import { Form, Button, Label } from "reactstrap";

import { BootstrapModal, AsyncSelectWrap } from "components";
import { useParams } from "react-router";
import { useToggle, useAxiosPrivate } from "hooks";
import { ExportFilter } from "common";
import { toast } from "react-toastify";

export const ExportContacts = ({ jobID, onFetch = () => null }) => {
  const { id } = useParams();
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const [dynamicInput, setDynamicInput] = useState([{ inputType: "" }]);
  const [buttonState, setButtonState] = useState(true);
  const [staticInput, setStaticInput] = useState({
    searchStrategy: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonState(false);
    const response = authAxios.post(`/sourcing/export/${jobID}`, {
      searchStrategy: staticInput.searchStrategy,
      searchFilters: dynamicInput,
    });
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
      onFetch();
      setStaticInput({ ...staticInput, searchStrategy: "" });
      setDynamicInput([]);
    } finally {
      setButtonState(true);
    }
  };

  const handleAddFields = () => {
    const values = [...dynamicInput];
    values.push({ inputType: "" });
    setDynamicInput(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...dynamicInput];
    values.splice(index, 1);
    setDynamicInput(values);
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i className="fas fa-users"></i> Export
      </Button>
      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>Export Candidate</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="exportContacts" onSubmit={handleSubmit}>
            <Label>Export Strategy</Label>
            <AsyncSelectWrap
              name="search_strategies"
              dependencies={{
                url: "/parameters",
                topic: "search_strategies",
                id: id,
              }}
              value={staticInput.searchStrategy}
              onChange={(event) =>
                setStaticInput({
                  ...staticInput,
                  searchStrategy: event,
                })
              }
              required
            />
            <ExportFilter
              data={dynamicInput}
              setData={setDynamicInput}
              onAddFields={handleAddFields}
              onRemoveFields={handleRemoveFields}
            />
          </Form>
          {/* <pre>
          {JSON.stringify(
            {
              searchStrategy: staticInput.searchStrategy,
              searchFilters: dynamicInput,
            },
            null,
            2
          )}
        </pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button color="primary" onClick={() => handleAddFields()}>
            Add Filter
          </Button>
          <Button
            disabled={!dynamicInput.length > 0 || !buttonState}
            type="submit"
            form="exportContacts"
            color="success"
          >
            {buttonState ? "Submit" : "Processing..."}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
