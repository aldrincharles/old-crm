import React, { useContext, useState } from "react";
import { Form, Button } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle, useAxiosPrivate } from "hooks";
import { ExportFilter } from "common";
import { FetchContext } from "context/FetchContext";
import { toast } from "react-toastify";

export const ExportMasterList = ({ id }) => {
  const { retrieveData } = useContext(FetchContext);
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const [formData, setFormData] = useState([{ inputType: "" }]);
  const [buttonState, setButtonState] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setButtonState(false);
    const response = authAxios.post(`/masterlist/${id}/export`, {
      searchFilters: formData,
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
      retrieveData();
      setFormData([]);
    } finally {
      setButtonState(true);
    }
  };

  const handleAddFields = () => {
    const values = [...formData];
    values.push({ inputType: "" });
    setFormData(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...formData];
    values.splice(index, 1);
    setFormData(values);
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i className="fas fa-users"></i> EXPORT
      </Button>

      <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>Export Candidate</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="exportMasterList" onSubmit={handleSubmit}>
            <ExportFilter
              data={formData}
              setData={setFormData}
              onAddFields={handleAddFields}
              onRemoveFields={handleRemoveFields}
            />
          </Form>
          {/* <pre>
          {JSON.stringify(
            {
              searchFilters: formData,
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
            disabled={!formData.length > 0 || !buttonState}
            type="submit"
            form="exportMasterList"
            color="success"
          >
            {buttonState ? <div>SUBMIT</div> : <div>Processing...</div>}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
