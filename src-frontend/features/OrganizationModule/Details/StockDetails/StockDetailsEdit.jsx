import React, { useEffect } from "react";

import { Form, Button, FormGroup, Label, Input } from "reactstrap";

import { BootstrapModal, SelectWrap } from "components";
import { useToggle, useAxiosPrivate, useCustomForm } from "hooks";
import { toast } from "react-toastify";

export const StockDetailsEdit = ({
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
      <StockDetailsEditDialogue
        url={url}
        data={data}
        visible={visible}
        toggle={toggle}
        refetch={refetchData}
      />
    </>
  );
};

const StockDetailsEditDialogue = ({
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
    company_type: data.company_type || "",
    stock_symbol: data.stock_symbol || "",
    stock_price: data.stock_price || "",
  };
  const authAxios = useAxiosPrivate();
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
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
        <BootstrapModal.Header>STOCK DETAILS</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="employeeDetailsForm" onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Company Type</Label>
              <SelectWrap
                name="company_type"
                value={{
                  label: formData.company_type,
                  value: formData.company_type,
                }}
                onChange={(event) =>
                  handleOnChange("company_type", event.value)
                }
                options={[
                  { value: "-", label: "-" },
                  { value: "Private Equity", label: "Private Equity" },
                  { value: "Pre-IPO", label: "Pre-IPO" },
                  { value: "Listed", label: "Listed" },
                  { value: "Venture Capital", label: "Venture Capital" },
                  {
                    value: "Acquired by Listed Company",
                    label: "Acquired by Listed Company",
                  },
                ]}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Stock Symbol</Label>
              <Input
                type="text"
                value={formData.stock_symbol}
                onChange={(e) =>
                  handleOnChange("stock_symbol", e.target.value)
                }
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Stock Price</Label>
              <Input
                type="number"
                min="0.01"
                step="0.01"
                value={formData.stock_price}
                onChange={(e) => handleOnChange("stock_price", e.target.value)}
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
