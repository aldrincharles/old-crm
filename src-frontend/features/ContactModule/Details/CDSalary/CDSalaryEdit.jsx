import React, { useState } from "react";
import { Button, Label, Input, Form, FormGroup } from "reactstrap";
import { BootstrapModal } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

export const CDSalaryEdit = ({ data, id, onRefetch = () => null }) => {
  const authAxios = useAxiosPrivate();
  const initialState = {
    currency: data?.currency || "",
    annual_base_salary: data?.annual_base_salary || "",
    annual_commission: data?.annual_commission || "",
    ote_split: data?.ote_split || "",
    travel_allowance: data?.travel_allowance || "",
    rsu_stock: data?.rsu_stock || "",
    annual_leave: data?.annual_leave || "",
    notice_period: data?.notice_period || "",
  };

  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );

  const [visible, toggle] = useToggle();
  const [buttonState, setButtonState] = useState(true);

  const onSubmit = async (data) => {
    setButtonState(false);

    try {
      const response = authAxios.put(`contact/${id}/salary-information`, {
        ...data,
      });

      toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });

      toggle();
      onRefetch(data);
    } catch (error) {
    } finally {
      setButtonState(true);
    }
  };

  return (
    <>
      <Button size="lg" color="primary" onClick={toggle}>
        <i className="ion-edit" />
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="xl">
        <BootstrapModal.Body>
          <Form id="CDSalaryEdit" onSubmit={handleSubmit}>
            <div className="signup-separator">
              <span style={{ fontSize: 24 }}>Current Salary</span>
            </div>
            <FormGroup>
              <Label>Currency:</Label>
              <Input
                type="text"
                value={formData.currency}
                onChange={(e) => {
                  handleOnChange("currency", e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Annual Base Salary:</Label>
              <Input
                type="text"
                value={formData.annual_base_salary}
                onChange={(e) => {
                  handleOnChange("annual_base_salary", e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Annual Commision / Incentive:</Label>
              <Input
                type="text"
                value={formData.annual_commission}
                onChange={(e) => {
                  handleOnChange("annual_commission", e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>OTE Split:</Label>
              <Input
                type="text"
                value={formData.ote_split}
                onChange={(e) => {
                  handleOnChange("ote_split", e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Travel Allowance:</Label>
              <Input
                type="text"
                value={formData.travel_allowance}
                onChange={(e) => {
                  handleOnChange("travel_allowance", e.target.value);
                }}
              />
            </FormGroup>
            <div className="signup-separator">
              <span style={{ fontSize: 24 }}>Additional Allowance</span>
            </div>
            <FormGroup>
              <Label>RSU / Stock Options:</Label>
              <Input
                type="text"
                value={formData.rsu_stock}
                onChange={(e) => {
                  handleOnChange("rsu_stock", e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Annual Leave:</Label>
              <Input
                type="text"
                value={formData.annual_leave}
                onChange={(e) => {
                  handleOnChange("annual_leave", e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Notice Period:</Label>
              <Input
                type="text"
                value={formData.notice_period}
                onChange={(e) => {
                  handleOnChange("notice_period", e.target.value);
                }}
              />
            </FormGroup>
          </Form>
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={!buttonState}
            type="submit"
            form="CDSalaryEdit"
            color="success"
          >
            {buttonState ? <div>SUBMIT</div> : <div>Processing...</div>}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
