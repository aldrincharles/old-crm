import React, { useContext, useState } from "react";

import {
  Card,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  Spinner,
  Row,
  Col,
} from "reactstrap";

import { FetchContext } from "context/FetchContext";
import { FetchFilterContext, pageSearch } from "context/FetchFilter";

const moduleOption = [
  { label: `Jobs`, value: `jobs` },
  { label: `Organizations`, value: `Organizations` },
  { label: `Contacts`, value: `Contacts` },
];

export const SearchFilter = () => {
  const { isLoading } = useContext(FetchContext);
  const { state, dispatch } = useContext(FetchFilterContext);
  const [form, setForm] = useState(state.search);

  const onChange = (name, value) => {
    setForm((prev) => {
      return { ...prev, [name]: value ? value : undefined };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (isLoading) return;

    dispatch(pageSearch(form));
  };

  return (
    <Card className=" p-3 mb-3 shadow-sm rounded">
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Module:</Label>
          <Input
            id="moduleSelect"
            type="select"
            value={form.module || ""}
            onChange={(e) => onChange("module", e.target.value)}
          >
            <option value="">Select</option>
            {moduleOption.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="J-Filter-Name">Input:</Label>
          <Input
            placeholder="form..."
            type="text"
            value={form.input || ""}
            onChange={(e) => onChange("input", e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="J-Filter-Name">Location:</Label>
          <Input
            placeholder="Search Location"
            type="text"
            value={form.location || ""}
            onChange={(e) => onChange("location", e.target.value)}
          />
        </FormGroup>
        <Row>
          <Col></Col>
          <Col>
            <Button
              className="mb-2 d-flex justify-content-center"
              disabled={isLoading}
              color="primary"
              type="submit"
            >
              {isLoading ? <Spinner></Spinner> : "Search"}
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </Card>
  );
};
