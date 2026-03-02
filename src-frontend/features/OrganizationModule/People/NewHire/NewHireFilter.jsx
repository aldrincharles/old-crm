import React, { useContext, useState } from "react";

import {
  Card,
  Form,
  FormGroup,
  Label,
  Button,
  Row,
  Col,
  Collapse,
} from "reactstrap";

import {
  FetchFilterContext,
  pageSearch,
  pageSearchReset,
} from "context/FetchFilter";
import { AsyncSelectWrap, SelectWrap } from "components";
import { useToggle } from "hooks";

export const NewHireFilter = () => {
  const [visible, toggle] = useToggle();
  const { state, dispatch } = useContext(FetchFilterContext);
  const [form, setForm] = useState(state.search);

  const onChange = (name, value) => {
    setForm((prev) => {
      return { ...prev, [name]: value ? value : undefined };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(pageSearch(form));
  };

  const onReset = () => {
    setForm({});
    dispatch(pageSearchReset());
  };

  return (
    <>
      <Button
        className="mb-3 d-flex justify-content-start"
        color="primary"
        onClick={toggle}
        // style={{ textAlign: "left" }}
      >
        <i className="fa fa-filter" />
      </Button>
      <Collapse isOpen={visible}>
        <Card className=" p-3 mb-3">
          <Form onSubmit={onSubmit}>
            <Row style={{ textAlign: "left" }}>
              <Col>
                <FormGroup>
                  <Label>Position:</Label>
                  <AsyncSelectWrap
                    name="position"
                    dependencies={{ url: "/parameters", topic: "position" }}
                    value={form.position || ""}
                    onChange={(event) => onChange("position", event)}
                    isMulti
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Location:</Label>
                  <AsyncSelectWrap
                    name="location"
                    dependencies={{ url: "/parameters", topic: "location" }}
                    value={form.location || ""}
                    onChange={(event) => onChange("location", event)}
                    isMulti
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Industry:</Label>
                  <AsyncSelectWrap
                    name="industry"
                    dependencies={{ url: "/parameters", topic: "industry" }}
                    value={form.industry || ""}
                    onChange={(event) => onChange("industry", event)}
                    isMulti
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Geography:</Label>
                  <AsyncSelectWrap
                    name="geography"
                    dependencies={{ url: "/parameters", topic: "geography" }}
                    value={form.geography || ""}
                    onChange={(event) => onChange("geography", event)}
                    isMulti
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Vertical:</Label>
                  <AsyncSelectWrap
                    name="vertical"
                    dependencies={{ url: "/parameters", topic: "vertical" }}
                    value={form.vertical || ""}
                    onChange={(event) => onChange("vertical", event)}
                    isMulti
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Month Joined:</Label>
                  <SelectWrap
                    name="month_joined"
                    value={form.month_joined || ""}
                    onChange={(event) => onChange("month_joined", event)}
                    options={[
                      { value: 3, label: "3 months ago" },
                      { value: 6, label: "6 months ago" },
                      { value: 9, label: "9 months ago" },
                      { value: 12, label: "12 months ago" },
                    ]}
                    isClearable
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Button color="primary" type="submit">
                  Search
                </Button>
                <Button
                  style={{ marginLeft: 5 }}
                  type="button"
                  onClick={onReset}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Collapse>
      {/* <pre>
        {JSON.stringify(
          {
            ...search,
          },
          null,
          2
        )}
      </pre> */}
    </>
  );
};
