import React, { useState } from "react";

import { Button, Label, Form, FormGroup } from "reactstrap";

import {
  BootstrapModal,
  CustomDatePicker,
  SelectWrap,
  AsyncSelectWrap,
} from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

const typeOfCompanyOptions = [
  { value: "-", label: "-" },
  { value: "Private Equity", label: "Private Equity" },
  { value: "Pre-IPO", label: "Pre-IPO" },
  { value: "Listed", label: "Listed" },
  { value: "Venture Capital", label: "Venture Capital" },
  {
    value: "Acquired by Listed Company",
    label: "Acquired by Listed Company",
  },
];

export const CDPreferencesEdit = ({
  id,
  isDisabled = false,
  onRefetch = () => null,
}) => {
  const initialState = {
    date_looking_to_move: new Date(),
    type_of_company: "",
    position: "",
    industry: "",
  };
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();
  const [buttonState, setButtonState] = useState(true);
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    setButtonState(false);
    try {
      let response = authAxios.put(`/contact/${id}/preferences`, {
        ...data,
      });

      response = await toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });

      const result = response.data;

      toggle();
      onRefetch(result.content);
      setButtonState(true);
    } catch (error) {
    } finally {
      setButtonState(true);
    }
  };

  return (
    <>
      <Button size="lg" color="primary" onClick={toggle} disabled={isDisabled}>
        <i className="ion-edit" />
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
        <BootstrapModal.Body>
          <Form id="LinkedInConnectionsEdit" onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Date Looking to Move</Label>
              <CustomDatePicker
                name="date_looking_to_move"
                selected={formData.date_looking_to_move}
                onChange={(e) => handleOnChange("date_looking_to_move", e)}
                dateFormat="MMMM yyyy"
              />
            </FormGroup>
            <FormGroup>
              <Label>Type of Company</Label>
              <SelectWrap
                name="type_of_company"
                value={formData.type_of_company}
                options={typeOfCompanyOptions}
                onChange={(e) => handleOnChange("type_of_company", e)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Position to Move Into</Label>
              <AsyncSelectWrap
                name="position"
                dependencies={{ url: "/parameters", topic: "position" }}
                value={formData.position}
                onChange={(e) => handleOnChange("position", e)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Industry</Label>
              <AsyncSelectWrap
                name="industry"
                dependencies={{ url: "/parameters", topic: "industry" }}
                value={formData.industry}
                onChange={(e) => handleOnChange("industry", e)}
              />
            </FormGroup>
          </Form>
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={!buttonState}
            type="submit"
            form="LinkedInConnectionsEdit"
            color="success"
          >
            {buttonState ? <div>SUBMIT</div> : <div>Processing...</div>}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
