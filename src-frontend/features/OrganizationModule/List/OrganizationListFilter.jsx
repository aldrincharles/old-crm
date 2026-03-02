import React, { useCallback, useContext, useState } from "react";

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

export const OrganizationListFilter = () => {
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
    <Card className=" p-3 mb-3">
      <h2 style={{ textAlign: "left" }}>Filters</h2>
      <Form onSubmit={onSubmit}>
        <Row style={{ textAlign: "left" }}>
          <Col>
            <FormGroup>
              <Label for="J-Filter-Name">Name:</Label>
              <Input
                id="J-Filter-Name"
                placeholder="Search Name"
                type="text"
                value={form.name || ""}
                onChange={(e) => onChange("name", e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Filter-Industry">Industry:</Label>
              <AsyncSelectWrap
                name="industry"
                dependencies={{ url: "/parameters", topic: "industry" }}
                value={form.industry || ""}
                onChange={(event) => onChange("industry", event)}
                isMulti
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="J-Filter-Vertical">Vertical:</Label>
              <AsyncSelectWrap
                name="vertical"
                dependencies={{ url: "/parameters", topic: "vertical" }}
                value={form.vertical || ""}
                onChange={(event) => onChange("vertical", event)}
                isMulti
              />
            </FormGroup>
            <FormGroup>
              <Label for="J-Filter-Category">Ranking:</Label>
              <SelectWrap
                name="ranking"
                value={form.ranking || ""}
                onChange={(event) => onChange("ranking", event)}
                options={[
                  { value: "T1", label: "T1" },
                  { value: "T2", label: "T2" },
                  { value: "T3", label: "T3" },
                  { value: "T4", label: "T4" },
                  { value: "T5", label: "T5" },
                  { value: "Distributors", label: "Distributors" },
                  { value: "New", label: "New" },
                  { value: "Not in Asia", label: "Not in Asia" },
                  { value: "SI", label: "SI" },
                  { value: "Consulting", label: "Consulting" },
                  {
                    value: "Strategic Consulting",
                    label: "Strategic Consulting",
                  },
                  { value: "Big 6", label: "Big 6" },
                  { value: "Indian Consulting", label: "Indian Consulting" },
                  { value: "MNC", label: "MNC" },
                  { value: "Niche", label: "Niche" },
                  { value: "Dead Company", label: "Dead Company" },
                ]}
                isMulti
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="J-Filter-Category">Classification:</Label>
              <SelectWrap
                name="classification"
                value={form.classification || ""}
                onChange={(event) => onChange("classification", event)}
                options={[
                  { value: "-", label: "-" },
                  { value: "Large MNC", label: "Large MNC" },
                  { value: "Rest of Top 200", label: "Rest of Top 200" },
                  { value: "Hyperscale", label: "Hyperscale" },
                  { value: "Future Hyperscale", label: "Future Hyperscale" },
                ]}
                isMulti
              />
            </FormGroup>
            <FormGroup>
              <Label for="J-Filter-Category">Solution Type :</Label>
              <SelectWrap
                name="solution_type"
                value={form.solution_type || ""}
                onChange={(event) => onChange("solution_type", event)}
                options={[
                  { value: "-", label: "-" },
                  { value: "Single Solution", label: "Single Solution" },
                  { value: "Multiple Solution", label: "Multiple Solution" },
                  { value: "Complex Solution", label: "Complex Solution" },
                ]}
              />
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
                disabled={form?.potential_client || form?.itel}
                checked={form.raas || false}
                onChange={(e) => onChange("raas", e.target.checked)}
              />
              <Label check>RaaS</Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                id="checkbox2"
                type="checkbox"
                disabled={form?.potential_client || form?.raas}
                checked={form.itel || false}
                onChange={(e) => onChange("itel", e.target.checked)}
              />
              <Label check>ITEL</Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                id="checkbox2"
                type="checkbox"
                disabled={form?.itel || form?.raas}
                checked={form.potential_client || false}
                onChange={(e) => onChange("potential_client", e.target.checked)}
              />
              <Label check>Potential Client</Label>
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
  );
});
