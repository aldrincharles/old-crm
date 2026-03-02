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
  Collapse,
} from "reactstrap";

import {
  FetchFilterContext,
  pageSearch,
  pageSearchReset,
} from "context/FetchFilter";
import { useToggle } from "hooks";
import { AsyncSelectWrap, SelectWrap } from "components";
import { clusterOption } from "constants";

export const ContactListFilter = () => {
  const { state, dispatch } = useContext(FetchFilterContext);
  const [form, setForm] = useState(state.search);
  const [visible, toggle] = useToggle();

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
      visible={visible}
      toggle={toggle}
    />
  );
};

const FormComponent = React.memo(
  ({ form, onSubmit, onReset, onChange, visible, toggle }) => {
    return (
      <Card className=" p-3 mb-3">
        <h2 style={{ textAlign: "left" }}>Filters</h2>
        <Form onSubmit={onSubmit}>
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
              <Label for="name">Name:</Label>
              <Input
                id="name"
                placeholder="Search Name"
                type="text"
                value={form.name || ""}
                onChange={(e) => onChange("name", e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="category">Category:</Label>
              <Input
                id="category"
                placeholder="Search Category"
                type="text"
                value={form.candidate_category || ""}
                onChange={(e) => onChange("candidate_category", e.target.value)}
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
              <Label for="geography">Geography:</Label>
              <AsyncSelectWrap
                name="geography"
                dependencies={{ url: "/parameters", topic: "geography" }}
                value={form.geography || ""}
                onChange={(event) => onChange("geography", event)}
                isMulti
              />
            </FormGroup>
          </div>
          <div style={{ textAlign: "left", marginTop: "5px" }}>
            <Button className="my-3" size="sm" color="primary" onClick={toggle}>
              Advance Filters
            </Button>
            <Collapse isOpen={visible}>
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

              <FormGroup>
                <Label for="organization_industry">
                  Organization Industry:
                </Label>
                <AsyncSelectWrap
                  name="organization_industry"
                  dependencies={{ url: "/parameters", topic: "industry" }}
                  value={form.organization_industry || ""}
                  onChange={(event) => onChange("organization_industry", event)}
                  isMulti
                />
              </FormGroup>

              <FormGroup>
                <Label for="previous_organization">
                  Previous Organization:
                </Label>
                <AsyncSelectWrap
                  name="previous_organization"
                  dependencies={{ url: "/parameters", topic: "organization" }}
                  value={form.previous_organization || ""}
                  onChange={(event) => onChange("previous_organization", event)}
                  isMulti
                />
              </FormGroup>

              <FormGroup>
                <Label for="previous_position">Previous Position:</Label>
                <AsyncSelectWrap
                  name="previous_position"
                  dependencies={{ url: "/parameters", topic: "position" }}
                  value={form.previous_position || ""}
                  onChange={(event) => onChange("previous_position", event)}
                  isMulti
                />
              </FormGroup>

              <FormGroup>
                <Label for="previous_industry">Previous Industry:</Label>
                <AsyncSelectWrap
                  name="previous_industry"
                  dependencies={{ url: "/parameters", topic: "industry" }}
                  value={form.previous_industry || ""}
                  onChange={(event) => onChange("previous_industry", event)}
                  isMulti
                />
              </FormGroup>

              <FormGroup>
                <Label for="previous_vertical">Previous Vertical:</Label>
                <AsyncSelectWrap
                  name="previous_vertical"
                  dependencies={{ url: "/parameters", topic: "vertical" }}
                  value={form.previous_vertical || ""}
                  onChange={(event) => onChange("previous_vertical", event)}
                  isMulti
                />
              </FormGroup>

              <FormGroup>
                <Label for="previous_location">Previous Location:</Label>
                <AsyncSelectWrap
                  name="previous_location"
                  dependencies={{ url: "/parameters", topic: "location" }}
                  value={form.previous_location || ""}
                  onChange={(event) => onChange("previous_location", event)}
                  isMulti
                />
              </FormGroup>

              <FormGroup>
                <Label for="previous_geography">Previous Geography:</Label>
                <AsyncSelectWrap
                  name="previous_geography"
                  dependencies={{ url: "/parameters", topic: "geography" }}
                  value={form.previous_geography || ""}
                  onChange={(event) => onChange("previous_geography", event)}
                  isMulti
                />
              </FormGroup>
            </Collapse>
          </div>
        </Form>
      </Card>
    );
  }
);
