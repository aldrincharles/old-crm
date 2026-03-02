import React, { useCallback, useState } from "react";

import { Form, FormGroup, Label, Button, Row, Col } from "reactstrap";

import { AsyncSelectWrap, SelectWrap } from "components";
import { gender, clusterOption } from "constants";

import {
  useSearchContext,
  pageSearch,
  pageSearchReset,
  useSearchDispatchContext,
} from "./context/Search";
import { useContactTableDispatch, pageNext } from "./context/Contacts";

export const ContactAnalyticsFilters = () => {
  const filter = useSearchContext();
  const setFilter = useSearchDispatchContext();
  const setContactTable = useContactTableDispatch();

  const [form, setForm] = useState(filter.search);

  const onChange = useCallback((name, value) => {
    setForm((prev) => {
      return { ...prev, [name]: value ? value : undefined };
    });
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setFilter(pageSearch(form));
      setContactTable(pageNext(1));
    },
    [form, setFilter, setContactTable]
  );

  const onReset = useCallback(() => {
    setForm({});
    setFilter(pageSearchReset());
    setContactTable(pageNext(1));
  }, [setFilter, setContactTable]);

  return (
    <FormComponent
      form={form}
      onSubmit={onSubmit}
      onChange={onChange}
      onReset={onReset}
    />
  );
};

const FormComponent = React.memo(({ form, onSubmit, onReset, onChange }) => {
  return (
    <Form onSubmit={onSubmit}>
      <h2 style={{ textAlign: "left" }}>Filters</h2>
      <Row className="mb-3">
        <Col>
          <Button color="primary" type="submit">
            Search
          </Button>
          <Button style={{ marginLeft: 5 }} type="button" onClick={onReset}>
            Reset
          </Button>
        </Col>
      </Row>
      <div style={{ textAlign: "left" }}>
        <FormGroup>
          <FormGroup>
            <Label for="cluster">Cluster:</Label>
            <SelectWrap
              name="cluster"
              value={form.cluster || ""}
              onChange={(event) => onChange("cluster", event)}
              options={clusterOption}
              isMulti
            />
          </FormGroup>

          <Label for="ranking">Ranking:</Label>
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
        <FormGroup>
          <Label for="industry">Industry:</Label>
          <AsyncSelectWrap
            name="industry"
            dependencies={{ url: "/parameters", topic: "industry" }}
            value={form.industry || ""}
            onChange={(event) => onChange("industry", event)}
            isMulti
          />
        </FormGroup>
        <FormGroup>
          <Label for="vertical">Vertical:</Label>
          <AsyncSelectWrap
            name="vertical"
            dependencies={{ url: "/parameters", topic: "vertical" }}
            value={form.vertical || ""}
            onChange={(event) => onChange("vertical", event)}
            isMulti
          />
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender:</Label>
          <SelectWrap
            name="gender"
            value={form.gender || ""}
            onChange={(event) => onChange("gender", event)}
            options={gender}
            isClearable
          />
        </FormGroup>
        <FormGroup>
          <Label for="organization">Organization:</Label>
          <AsyncSelectWrap
            name="organization"
            dependencies={{ url: "/parameters", topic: "organization" }}
            value={form.organization || ""}
            onChange={(event) => onChange("organization", event)}
            isMulti
          />
        </FormGroup>
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
        <FormGroup>
          <Label for="age_group">Age Group:</Label>
          <AsyncSelectWrap
            name="age_group"
            dependencies={{ url: "/parameters", topic: "age_group" }}
            value={form.age_group || ""}
            onChange={(event) => onChange("age_group", event)}
            isMulti
          />
        </FormGroup>
        <FormGroup>
          <Label for="geography">Geography:</Label>
          <AsyncSelectWrap
            name="geography"
            dependencies={{ url: "/parameters", topic: "geography" }}
            value={form.geography || ""}
            onChange={(event) => onChange("geography", event)}
            isMulti
          />
        </FormGroup>
        <FormGroup>
          <Label for="tenure">Tenure:</Label>
          <AsyncSelectWrap
            name="tenure"
            dependencies={{ url: "/parameters", topic: "tenure" }}
            value={form.tenure || ""}
            onChange={(event) => onChange("tenure", event)}
            isMulti
          />
        </FormGroup>
      </div>
    </Form>
  );
});
