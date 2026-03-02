/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import styled from "styled-components";
import { Row, Col, ButtonGroup, Card } from "reactstrap";

import { FetchProvider } from "context/FetchContext";
import { FetchFilterProvider } from "context/FetchFilter";
import { AuthContext } from "context/Auth";

import { AddContact } from "./AddContact";
import { ContactListFilter } from "./ContactListFilter";
import { ContactListDisplay } from "./ContactListDisplay";
import { DownloadCSV } from "./CSV/DownloadCSV";

const FilterStyle = styled.div`
  @media (max-width: 700px) {
    padding-top: 64px;
  }
  @media (min-width: 700px) {
    position: fixed;
    width: 330px;
    height: calc(100% - 150px);
    overflow-y: scroll;
  }
`;

const ContentStyle = styled.div`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  overflow-y: scroll;
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 345px;
    height: calc(100% - 150px);
    width: calc(100% - 365px);
  }
`;

const ContactListMain = () => {
  const { auth } = useContext(AuthContext);

  return (
    <FetchFilterProvider name="contacts">
      <FetchProvider url={"/contact"}>
        <FilterStyle>
          <ContactListFilter />
        </FilterStyle>
        <ContentStyle>
          <Row>
            <Col lg="auto" className="d-flex justify-content-start"></Col>
            <Col className="mb-2 d-flex justify-content-end">
              <ButtonGroup>
                <AddContact />
                {auth?.access_limit === 0 && <DownloadCSV />}
              </ButtonGroup>
            </Col>
          </Row>
          <Card>
            <ContactListDisplay />
            <FetchProvider.Pagination />
          </Card>
        </ContentStyle>
      </FetchProvider>
    </FetchFilterProvider>
  );
};
export { ContactListMain };
