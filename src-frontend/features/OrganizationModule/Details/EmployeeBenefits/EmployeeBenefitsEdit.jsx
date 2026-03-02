import React, { useEffect } from "react";

import { Form, Button, FormGroup, Label, Input } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle, useAxiosPrivate, useCustomForm } from "hooks";
import { toast } from "react-toastify";

export const EmployeeBenefitsEdit = ({
  id,
  url,
  data,
  refetchData = () => null,
}) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i className="ion-edit" />
      </Button>
      <EmployeeEditDialogue
        url={url}
        data={data}
        visible={visible}
        toggle={toggle}
        refetch={refetchData}
      />
    </>
  );
};

const EmployeeEditDialogue = ({
  url,
  data,
  visible,
  toggle,
  refetch = () => null,
}) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  // const { retrieveData } = useContext(FetchContext);
  const initialFormData = {
    healthcare_policy: data.healthcare_policy || "",
    stock_options: data.healthcare_policy || "",
    transport_allowance: data.transport_allowance || "",
    holidays_count: data.holidays_count || "",
  };
  const authAxios = useAxiosPrivate();
  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    initialFormData,
    (e) => onSubmit(e)
  );

  const onSubmit = async (value) => {
    const response = authAxios.put(url, {
      ...value,
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
      toggle();
      refetch();
      // retrieveData();
    } finally {
    }
  };

  return (
    <>
      <BootstrapModal size="sm" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>
          EMPLOYEE BENEFITS INFORMATION
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="employeeDetailsForm" onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Healthcare Policy</Label>
              <Input
                type="textarea"
                value={formData.healthcare_policy}
                onChange={(e) =>
                  handleOnChange("healthcare_policy", e.target.value)
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Stock Options</Label>
              <Input
                type="textarea"
                value={formData.stock_options}
                onChange={(e) =>
                  handleOnChange("stock_options", e.target.value)
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Holidays Count</Label>
              <Input
                type="number"
                value={formData.holidays_count}
                min={1}
                onChange={(e) =>
                  handleOnChange("holidays_count", e.target.value)
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Transport Allowance</Label>
              <Input
                type="number"
                min="0.01"
                step="0.01"
                value={formData.transport_allowance}
                onChange={(e) =>
                  handleOnChange("transport_allowance", e.target.value)
                }
                required
              />
            </FormGroup>
          </Form>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button color="success" type="submit" form="employeeDetailsForm">
            SUBMIT
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
