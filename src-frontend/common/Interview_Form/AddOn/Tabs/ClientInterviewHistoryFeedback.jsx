import React from "react";

import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { toast } from "react-toastify";

import { useCustomForm, useAxiosPrivate } from "hooks";

export const ClientInterviewFeedback = ({
  data,
  reachout_id,
  onRefetch = () => null,
}) => {
  const authAxios = useAxiosPrivate();
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    {
      client_feedback: "",
      candidate_feedback: "",
    },
    (e) => onSubmit(e)
  );

  const onSubmit = async (data) => {
    try {
      toast.promise(
        authAxios.post(`jobs/reachout/save-feedback/${reachout_id}`, {
          ...data,
        }),
        {
          pending: "Pending",
          success: {
            render({ data }) {
              const message = data.data?.message;
              return `${message} 👌`;
            },
          },
          error: "Oops! Something went wrong 🤯",
        }
      );

      onRefetch();
    } catch (error) {}
  };

  return (
    <>
      <div className="mt-5">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>CLIENT FEEDBACK</Label>
            <Card className="my-2">
              <CardBody>
                {data?.client_feedback ? (
                  <p>{data.client_feedback}</p>
                ) : (
                  <p>No client feedback...</p>
                )}
              </CardBody>
            </Card>

            <Input
              type="textarea"
              name="client_feedback"
              maxLength={1000}
              placeholder="Write Client feedback here..."
              value={formData.client_feedback}
              onChange={(e) =>
                handleOnChange("client_feedback", e.target.value)
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>CANDIDATE FEEDBACK</Label>
            <Card className="my-2">
              <CardBody>
                {data?.candidate_feedback ? (
                  <p>{data.candidate_feedback}</p>
                ) : (
                  <p>No candidate feedback...</p>
                )}
              </CardBody>
            </Card>
            <Input
              type="textarea"
              name="candidate_feedback"
              maxLength={1000}
              placeholder="Write Candidate feedback here..."
              value={formData.candidate_feedback}
              onChange={(e) =>
                handleOnChange("candidate_feedback", e.target.value)
              }
            />
          </FormGroup>
          <Button color="success" type="submit">
            SUBMIT
          </Button>
        </Form>
      </div>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </>
  );
};
