import React, { useState } from "react";

import classNames from "classnames";
import {
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Alert,
  Row,
  Col,
  Input,
  FormText,
} from "reactstrap";

import { useAxiosPrivate } from "hooks";
import { Conditional } from "components";
import { toast } from "react-toastify";

export const ResumeTab = ({
  infoData,
  modal_contact_id,
  onRefetch = () => null,
}) => {
  const authAxios = useAxiosPrivate();
  const initialState = {
    originalResume: null,
    itelResume: null,
  };
  const [activeTab, setActiveTab] = useState("basic");
  const [userInput, setUserInput] = useState(initialState);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.value.length <= 0) {
      setUserInput({
        ...userInput,
        [event.target.name]: null,
      });
      return;
    }

    let file = event.target.files[0];

    setUserInput({
      ...userInput,
      [event.target.name]: file,
    });
  };

  const uploadOriginalResume = async (event) => {
    event.preventDefault();
    let file = userInput.originalResume;
    let formData = new FormData();
    formData.append("file", file);

    try {
      toast.promise(
        authAxios.post(
          `/contact-information/${modal_contact_id}/basic-resume`,
          formData
        ),
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
    } catch (error) {
      setError(error.message);
    }
  };

  const uploadItelResume = async (event) => {
    event.preventDefault();
    let file = userInput.itelResume;
    let formData = new FormData();
    formData.append("file", file);

    try {
      toast.promise(
        authAxios.post(
          `/contact-information/${modal_contact_id}/itel-resume`,
          formData
        ),
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
    } catch (error) {
      setError(error.message);
    }
  };

  const handleTabOnSelect = (key) => {
    if (activeTab !== key) setActiveTab(key);
  };

  return (
    <>
      <Conditional if={error}>
        <Alert color="danger">Ooops! Something went wrong...</Alert>
      </Conditional>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classNames(
              { active: activeTab === "basic" },
              "pointer-active"
            )}
            onClick={() => {
              handleTabOnSelect("basic");
            }}
          >
            Basic
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classNames(
              { active: activeTab === "itel" },
              "pointer-active"
            )}
            onClick={() => {
              handleTabOnSelect("itel");
            }}
          >
            itel
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="basic">
          <Form onSubmit={uploadOriginalResume}>
            <FormGroup>
              <Row className="mt-3">
                <Col>
                  <Input
                    type="file"
                    name="originalResume"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                  />
                  <FormText>
                    {userInput.originalResume && userInput.originalResume.name}
                  </FormText>
                </Col>
                <Col>
                  <Button color="primary" type="submit">
                    <i className="fas fa-upload" /> Upload
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
          <iframe
            title="basic_resume_iframe"
            id="basicResumeFrame"
            src={infoData?.display_orig_resume}
            scrolling="auto"
            height="1000"
            width="100%"
          />
        </TabPane>
        <TabPane tabId="itel">
          <Form onSubmit={uploadItelResume}>
            <FormGroup>
              <Row className="mt-3">
                <Col>
                  <Input
                    type="file"
                    name="itelResume"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                  />
                  <FormText>
                    {userInput.itelResume && userInput.itelResume.name}
                  </FormText>
                </Col>
                <Col>
                  <Button color="primary" type="submit">
                    <i className="fas fa-upload" /> Upload
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>

          <iframe
            title="itel_resume_iframe"
            id="itelResumeFrame"
            src={infoData?.display_itel_resume}
            scrolling="auto"
            height="1000"
            width="100%"
          />
        </TabPane>
      </TabContent>
    </>
  );
};
