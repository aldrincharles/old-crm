import React, { useState } from "react";

import { Button, Row, Col, Form, FormGroup, Input, FormText } from "reactstrap";
import { useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

export const CDResumeAdd = ({ id, onRefetch = () => null }) => {
  const initialState = {
    resume: null,
  };
  const authAxios = useAxiosPrivate();
  const [buttonState, setButtonState] = useState(true);
  const [userInput, setUserInput] = useState(initialState);

  const handleFileChange = (event) => {
    if (event.target.value.length <= 0) {
      setUserInput((prev) => {
        return {
          ...prev,
          [event.target.name]: null,
        };
      });
      return;
    }

    let file = event.target.files[0];

    setUserInput((prev) => {
      return {
        ...prev,
        [event.target.name]: file,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonState(false);
    let file = userInput.resume;
    let formData = new FormData();
    formData.append("file", file);

    try {
      const response = authAxios.post(`/contact/${id}/resume`, formData);
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
    } catch (error) {
    } finally {
      setButtonState(true);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Row className="mt-3 ms-3">
            <Col>
              <Input
                className="custom-file-input"
                type="file"
                name="resume"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
              <FormText>{userInput.resume && userInput.resume.name}</FormText>
            </Col>
            <Col>
              <Button disabled={!buttonState} color="primary" type="submit">
                {buttonState ? (
                  <>
                    <i className="fas fa-upload me-2" />
                    Upload
                  </>
                ) : (
                  <>Processing...</>
                )}
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </>
  );
};
