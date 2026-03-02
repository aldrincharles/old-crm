import React, { useState } from "react";

import { toast } from "react-toastify";

import { Button, Row, Col, Form, FormGroup, FormText, Input } from "reactstrap";
import { useAxiosPrivate } from "hooks";

export const CDNoteArchiveAdd = ({ id, onRefetch = () => null }) => {
  const initialState = {
    archive: null,
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
    let file = userInput.archive;
    let formData = new FormData();
    formData.append("file", file);

    try {
      const response = authAxios.post(
        `/contact/${id}/interview-notes`,
        formData
      );
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
                name="archive"
                accept="application/pdf"
                onChange={handleFileChange}
                required
              />
              <FormText>{userInput.archive && userInput.archive.name}</FormText>
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
