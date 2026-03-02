import React, { useState, useContext, useCallback } from "react";

import {
  Card,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";

import {
  FetchFilterContext,
  pageSearch,
  pageSearchReset,
} from "context/FetchFilter";
import { AsyncSelectWrap, SelectWrap } from "components";
import { jobStatus } from "constants";
import { jobClassification } from "constants";
import { raasItel } from "constants";

export const JobListFilter = () => {
  const { state, dispatch } = useContext(FetchFilterContext);
  const [form, setForm] = useState(state.search);

  const onChange = useCallback((name, value) => {
    setForm((prev) => {
      return { ...prev, [name]: value ? value : undefined };
    });
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(pageSearch(form));
    },
    [dispatch, form]
  );

  const onReset = useCallback(() => {
    setForm({});
    dispatch(pageSearchReset());
  }, [dispatch]);

  return (
    <FormComponent
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      onReset={onReset}
    />
  );
};

const FormComponent = React.memo(({ form, onSubmit, onReset, onChange }) => {
  return (
    <Card className=" p-3 mb-3  shadow-sm rounded">
      <h2 style={{ textAlign: "left" }}>Filters</h2>
      <Form onSubmit={onSubmit}>
        <Row style={{ textAlign: "left" }}>
          <Col>
            <FormGroup>
              <Label for="organization">Organization:</Label>
              <AsyncSelectWrap
                name="organization"
                dependencies={{ url: "/parameters", topic: "organization" }}
                value={form.organization || ""}
                onChange={(event) => onChange("organization", event)}
                isClearable
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                id="name"
                placeholder="Search Name"
                type="text"
                value={form.name || ""}
                onChange={(e) => onChange("name", e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="status">Status:</Label>
              <SelectWrap
                name="status"
                value={form.status || ""}
                options={jobStatus}
                onChange={(event) => onChange("status", event)}
                isClearable
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category:</Label>
              <SelectWrap
                name="category"
                value={form.category || ""}
                options={raasItel}
                onChange={(event) => onChange("category", event)}
                isClearable
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
                isClearable
              />
            </FormGroup>
            <FormGroup>
              <Label for="classification">Classification:</Label>
              <SelectWrap
                name="classification"
                value={form.classification || ""}
                onChange={(event) => onChange("classification", event)}
                options={jobClassification}
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
            <Button style={{ marginLeft: 5 }} type="button" onClick={onReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
});
