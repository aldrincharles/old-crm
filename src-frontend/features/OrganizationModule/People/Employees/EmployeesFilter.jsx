import React, { useContext, useState } from "react";

import {
  Card,
  Form,
  Input,
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
import { useToggle } from "hooks";
import { AsyncSelectWrap } from "components";

export const EmployeesFilter = () => {
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
                  <Label for="JSM-Filter-Name">Name:</Label>
                  <Input
                    id="JSM-Filter-Name"
                    placeholder="Search Name"
                    type="text"
                    value={form.name || ""}
                    onChange={(e) => onChange("name", e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="position">Position:</Label>
                  <AsyncSelectWrap
                    name="position"
                    dependencies={{ url: "/parameters", topic: "position" }}
                    value={form.position || ""}
                    onChange={(event) => onChange("position", event)}
                    isMulti
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="location">Location:</Label>
                  <AsyncSelectWrap
                    name="location"
                    dependencies={{ url: "/parameters", topic: "location" }}
                    value={form.location || ""}
                    onChange={(event) => onChange("location", event)}
                    isMulti
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
