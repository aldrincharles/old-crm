import React from "react";

import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { toast } from "react-toastify";

import { BootstrapModal, Conditional } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { ClientInterviewHistory } from "./AddOn/ClientInterviewHistory";

export const InterviewDetails = ({
  url = "",
  condition = "",
  row,
  onUpdateValues = () => {},
}) => {
  const {
    interview_date,
    interview_time,
    timezone,
    interview_location,
    interviewer,
    reachout_id,
  } = row.original;
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();

  const initialState = {
    interview_date: new Date(interview_date),
    interview_time: interview_time ? interview_time : "12:00",
    time_zone: timezone ? timezone : "",
    location: interview_location ? interview_location : "",
    interviewer: interviewer ? interviewer : "",
  };
  const { formData, handleSubmit, handleOnChange } = useCustomForm(
    initialState,
    (e) => onSumbit(e)
  );

  const onSumbit = async (data) => {
    try {
      toast.promise(
        authAxios.post(url, {
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

      onUpdateValues({
        interview_date: data.interview_date,
        interview_time: data.interview_time,
        timezone: data.time_zone,
        interview_location: data.location,
        interviewer: data.interviewer,
      });
    } catch (error) {}
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        View Interview Details
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
        <BootstrapModal.Header>Details</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="InterviewDetails" onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Interview Date</Label>
                  <DatePicker
                    name="interview_date"
                    dateFormat="MM/dd/yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    selected={formData.interview_date}
                    onChange={(e) => handleOnChange("interview_date", e)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Interview Time</Label>
                  <TimePicker
                    name="interview_time"
                    // format="h:mm a"
                    value={formData.interview_time}
                    onChange={(e) => handleOnChange("interview_time", e)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Time Zone</Label>
                  <Input
                    type="text"
                    name="time_zone"
                    maxLength={8}
                    value={formData.time_zone}
                    onChange={(e) =>
                      handleOnChange("time_zone", e.target.value)
                    }
                    placeholder="Timezone"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Location</Label>
                  <Input
                    type="text"
                    name="location"
                    maxLength={24}
                    value={formData.location}
                    onChange={(e) => handleOnChange("location", e.target.value)}
                    placeholder="Place location here..."
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>Interviewer</Label>
                  <Input
                    type="text"
                    name="interviewer"
                    maxLength={24}
                    value={formData.interviewer}
                    onChange={(e) =>
                      handleOnChange("interviewer", e.target.value)
                    }
                    placeholder="Place interviewer name here..."
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <Conditional if={condition === "Client Interview"}>
            <ClientInterviewHistory reachout_id={reachout_id} />
          </Conditional>
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button form="InterviewDetails" type="submit" color="success">
            Save
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
