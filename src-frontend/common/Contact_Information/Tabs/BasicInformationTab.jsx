import React, { useState } from "react";

import {
  Button,
  Form,
  Badge,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  CardHeader,
  Label,
  FormGroup,
} from "reactstrap";
import { toast } from "react-toastify";

import { Skeleton, InputWrap } from "components";
import { useAxiosPrivate } from "hooks";
import { SubCategoryMain } from "./ContactSubCategory/SubCategoryMain";

export const BasicInformationTab = ({
  infoData,
  modal_contact_id,
  shortcut_linked_in,
  isLoading = true,
  onRefetch = () => null,
}) => {
  const authAxios = useAxiosPrivate();
  const initialState = {
    comment: "",
  };
  const [buttonState, setButtonState] = useState(true);
  const [userInput, setUserInput] = useState(initialState);

  const basicInformation = [
    { label: "Gender", value: infoData?.display_gender },
    { label: "Age", value: infoData?.display_year_graduated },
    {
      label: "Organization",
      value: (
        <a
          href={`/organizations/${infoData?.display_organization_id}/${infoData?.display_organization}/details`}
        >
          {infoData?.display_organization}
        </a>
      ),
    },
    { label: "Job Title", value: infoData?.display_job_title },
    {
      label: "Current Position Time Frame",
      value: infoData?.display_time_frame,
    },
    {
      label: "Current Company Time Frame",
      value: infoData?.display_time_frame_company,
    },
    { label: "ID Status", value: infoData?.display_id_status },
    { label: "Nationality", value: infoData?.display_nationality },
    { label: "Personal Email", value: infoData?.display_personal_email },
    { label: "Company Email", value: infoData?.display_work_email },
    { label: "Mobile", value: infoData?.display_mobile_number },
    { label: "Industry", value: infoData?.display_industry },
    { label: "Vertical", value: infoData?.display_vertical },
    { label: "Seniority", value: infoData?.display_seniority },
    { label: "Position", value: infoData?.display_position },
    { label: "Location", value: infoData?.display_location },
    { label: "Geography", value: infoData?.display_geography },
  ];

  const previousStatus = [
    { label: "Previous Job", value: infoData?.display_previous_job },
    {
      label: "Previous Organization",
      value: infoData?.display_previous_organization,
    },
    { label: "Previous title", value: infoData?.display_previous_title },
    { label: "Previous Time Frame", value: infoData?.display_time_frame },
    {
      label: "Previous Company Time Frame",
      value: infoData?.display_time_frame_company,
    },
  ];

  const basicSalary = [
    { label: "Base:", value: infoData?.display_base_salary },
    { label: "Commission:", value: infoData?.display_base_salary },
    { label: infoData?.display_salary_incentives, value: null },
    { label: "Split:", value: infoData?.display_salary_split },
  ];

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setUserInput({
      ...userInput,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setButtonState(false);
    try {
      toast.promise(
        authAxios.post(`/contact-information/${modal_contact_id}/comment`, {
          comment: userInput.comment,
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
      setUserInput(initialState);
    } finally {
      setButtonState(true);
    }
  };

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <p>
          <small>Last updated: {infoData?.display_last_updated}</small>
        </p>
        <p>
          <small>Date Added: {infoData?.display_date_added}</small>
        </p>
      </div>
      <div className="text-center">
        <div className="mg-b-10">
          <h2>{infoData?.display_name}</h2>
          <a href={shortcut_linked_in} target="_blank" rel="noreferrer">
            {shortcut_linked_in}
          </a>
        </div>
      </div>
      <Row className="mt-3">
        <Col className="lg-6 md-6">
          <Card>
            <ListGroup flush>
              <ListGroupItem>
                {basicInformation.map((data, index) => (
                  <p
                    key={index}
                    className={isLoading ? null : "contact-item border-bottom"}
                  >
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      <>
                        <span>{data.label}</span>
                        <span className="tx-inverse">{data.value}</span>
                      </>
                    )}
                  </p>
                ))}
                <p className="contact-item border-bottom">
                  <span></span>
                  <span></span>
                </p>
                {previousStatus.map((data, index) => (
                  <p
                    key={index}
                    className={isLoading ? null : "contact-item border-bottom"}
                  >
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      <>
                        <span>{data.label}</span>
                        <span className="tx-inverse">{data.value}</span>
                      </>
                    )}
                  </p>
                ))}
              </ListGroupItem>
            </ListGroup>
          </Card>
          <Card className="mg-t-10 mt-3">
            <CardHeader>
              <span>Comment</span>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem>
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <InputWrap
                      name="comment"
                      type="textarea"
                      value={userInput.comment}
                      onChange={handleChange}
                      cols="30"
                      rows="3"
                    />
                  </FormGroup>
                  <Button
                    disabled={!buttonState}
                    color="primary"
                    className="my-2"
                  >
                    {buttonState ? <div>Submit</div> : <div>Processing...</div>}
                  </Button>
                </Form>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col className="lg-6 md-6">
          <Card>
            <ListGroup flush>
              <ListGroupItem>
                <Label className="tx-danger">Basic Salary Details</Label>
                <p className={isLoading ? null : "contact-item"}>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <span>Currency:</span>
                      <span className="tx-inverse">
                        {infoData?.display_salary_currency}
                      </span>
                    </>
                  )}
                </p>
                {basicSalary.map((data, index) => (
                  <p
                    key={index}
                    className={isLoading ? null : "contact-item border-bottom"}
                  >
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      <>
                        <span>{data.label}</span>
                        <span className="tx-inverse">{data.value}</span>
                      </>
                    )}
                  </p>
                ))}
              </ListGroupItem>
            </ListGroup>
          </Card>

          <Card className="mg-t-10 mt-3">
            <CardHeader>
              <span>Connections</span>
            </CardHeader>
            {isLoading ? (
              <Skeleton count={2} />
            ) : (
              <ListGroup flush>
                <ListGroupItem>
                  {infoData?.connections?.length > 0 &&
                    infoData?.connections.map((data, index) => (
                      <Badge className="me-2" color="info" key={index}>
                        {data.connection}
                      </Badge>
                    ))}
                </ListGroupItem>
              </ListGroup>
            )}
          </Card>

          {isLoading ? (
            <Skeleton count={2} />
          ) : (
            <SubCategoryMain id={infoData?.contact_id}></SubCategoryMain>
          )}
          <Card className="mg-t-10 mt-3">
            <CardHeader>
              <span>Sales Specializations</span>
            </CardHeader>
            {isLoading ? (
              <Skeleton count={2} />
            ) : (
              <ListGroup flush>
                <ListGroupItem>
                  {infoData?.display_sales_specialization?.length > 0 &&
                    infoData?.display_sales_specialization.map(
                      (data, index) => (
                        <Badge className="me-2" color="info" key={index}>
                          {data.specialization}
                        </Badge>
                      )
                    )}
                </ListGroupItem>
              </ListGroup>
            )}
          </Card>
          <Card className="mg-t-10 mt-3">
            <CardHeader>
              <span>Software Development Specializations</span>
            </CardHeader>
            {isLoading ? (
              <Skeleton count={2} />
            ) : (
              <ListGroup flush>
                <ListGroupItem>
                  {infoData?.display_dev_specialization?.length > 0 &&
                    infoData?.display_dev_specialization.map((data, index) => (
                      <Badge className="me-2" color="info" key={index}>
                        {data.dev_specializations}
                      </Badge>
                    ))}
                </ListGroupItem>
              </ListGroup>
            )}
          </Card>
          <Card className="mg-t-10 mt-3">
            <CardHeader>
              <span>Languages</span>
            </CardHeader>
            {isLoading ? (
              <Skeleton count={2} />
            ) : (
              <ListGroup flush>
                <ListGroupItem>
                  {infoData?.display_languages?.length > 0 &&
                    infoData?.display_languages.map((data, index) => (
                      <Badge className="me-2" color="info" key={index}>
                        {data.languages}
                      </Badge>
                    ))}
                </ListGroupItem>
              </ListGroup>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};
