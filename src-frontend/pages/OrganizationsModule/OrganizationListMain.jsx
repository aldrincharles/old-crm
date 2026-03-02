import { Row, Col, ButtonGroup } from "reactstrap";

import { FetchProvider } from "context/FetchContext";
import { FetchFilterProvider } from "context/FetchFilter";

import {
  OrganizationListFilter,
  OrganizationListDisplay,
  OrganizationListAdd,
  OrganizationSummary,
} from "features/OrganizationModule/List";

const OrganizationListMain = () => {
  return (
    <FetchFilterProvider name="organizations">
      <FetchProvider url={`/organizations`}>
        <Row>
          <Col lg="auto" className="d-flex justify-content-start">
            <h1>ORGANIZATION</h1>
          </Col>
          <Col className="mb-2 d-flex justify-content-end">
            <ButtonGroup vertical className="">
              <OrganizationListAdd />
              <OrganizationSummary />
            </ButtonGroup>
          </Col>
        </Row>
        <OrganizationListFilter />
        <OrganizationListDisplay />
        <FetchProvider.Pagination />
      </FetchProvider>
    </FetchFilterProvider>
  );
};

export default OrganizationListMain;
