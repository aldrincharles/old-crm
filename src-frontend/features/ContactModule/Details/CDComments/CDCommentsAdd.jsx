import React, { useState } from "react";

import { toast } from "react-toastify";
import { Card, CardBody, Input, Form, Button, Collapse } from "reactstrap";

import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";

export const CDCommentsAdd = ({ id, onRefetch = () => null }) => {
  const authAxios = useAxiosPrivate();
  const [buttonState, setButtonState] = useState(true);
  const [visible, toggle] = useToggle();

  const initialState = {
    comment: "",
  };

  const { formData, handleOnChange, handleSubmit, reset } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    setButtonState(false);
    try {
      const response = authAxios.post(`/contact/${id}/comments`, {
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
      onRefetch();
      reset();
    } catch (error) {
    } finally {
      setButtonState(true);
    }
  };

  return (
    <>
      <Button size="lg" color="primary" onClick={toggle}>
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </Button>
      <Collapse isOpen={visible}>
        <Card className="my-2">
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <Input
                type="textarea"
                value={formData.comment}
                onChange={(e) => {
                  handleOnChange("comment", e.target.value);
                }}
                placeholder="Write Comment Here..."
                required
              />
              <Button disabled={!buttonState} color="success" className="my-2">
                {buttonState ? <div>SUBMIT</div> : <div>Processing...</div>}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Collapse>
    </>
  );
};
