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
} from "reactstrap";

import { gradingOption } from "constants";

import {
  FetchFilterContext,
  pageSearch,
  pageSearchReset,
} from "context/FetchFilter";

export const MasterListSourceFilter = () => {
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
      <Card className=" p-3 mb-3">
        <h2 style={{ textAlign: "left" }}>Filters</h2>
        <Form onSubmit={onSubmit}>
          <Row style={{ textAlign: "left" }}>
            <Col>
              <FormGroup>
                <Label for="M-Filter-Name">Name:</Label>
                <Input
                  id="M-Filter-Name"
                  placeholder="Search Name"
                  type="text"
                  value={form.name || ""}
                  onChange={(e) => onChange("name", e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="M-Filter-Organization">Organization:</Label>
                <Input
                  id="M-Filter-Organization"
                  placeholder="Search Organization"
                  type="text"
                  value={form.organization || ""}
                  onChange={(e) => onChange("organization", e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="M-Filter-Industry">Industry:</Label>
                <Input
                  id="M-Filter-Industry"
                  placeholder="Search Industry"
                  type="text"
                  value={form.industry || ""}
                  onChange={(e) => onChange("industry", e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="M-Filter-Vertical">Vertical:</Label>
                <Input
                  id="M-Filter-Vertical"
                  placeholder="Search Vertical"
                  type="text"
                  value={form.vertical || ""}
                  onChange={(e) => onChange("vertical", e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="M-Filter-GeneralGrade">General Grade:</Label>
                <Input
                  id="M-Filter-GeneralGrade"
                  placeholder="Search General Grade"
                  type="select"
                  value={form.generalGrade || ""}
                  onChange={(e) => onChange("generalGrade", e.target.value)}
                >
                  <option value="">All</option>
                  {gradingOption.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <FormGroup check inline>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  disabled={form?.notConnected === true}
                  checked={form.connected_with || false}
                  onChange={(e) => onChange("connected_with", e.target.checked)}
                />
                <Label check>Connected</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  checked={form.opportunity || false}
                  onChange={(e) => onChange("opportunity", e.target.checked)}
                />
                <Label check>Looking for opportunity</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  disabled={form?.noIVNotes === true}
                  checked={form.notes || false}
                  onChange={(e) => onChange("notes", e.target.checked)}
                />
                <Label check>IV Notes</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  disabled={form?.noCV === true}
                  checked={form.cv || false}
                  onChange={(e) => onChange("cv", e.target.checked)}
                />
                <Label check>CV</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  disabled={form?.connected_with === true}
                  checked={form.notConnected || false}
                  onChange={(e) => onChange("notConnected", e.target.checked)}
                />
                <Label check>Not Connected</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  disabled={form?.notes === true}
                  checked={form.noIVNotes || false}
                  onChange={(e) => onChange("noIVNotes", e.target.checked)}
                />
                <Label check>No IV Notes</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  disabled={form?.cv === true}
                  checked={form.noCV || false}
                  onChange={(e) => onChange("noCV", e.target.checked)}
                />
                <Label check>No CV</Label>
              </FormGroup>
            </Col>
            <Col></Col>
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
