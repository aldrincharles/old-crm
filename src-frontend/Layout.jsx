import React from "react";

import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Header } from "./components";

const Wrapper = styled.div`
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
  @media (min-width: 700px) {
    flex: 1;
    height: calc(100% - 150px);
    width: 100%;
  }
`;

const nav = [
  {
    to: "jobs",
    name: "Jobs",
  },
  {
    to: "organizations",
    name: "Organizations",
  },
  {
    to: "contacts",
    name: "Contacts",
  },
  {
    to: "masterlists",
    name: "Master List",
  },
  // {
  //   to: "scrum",
  //   name: "Scrum",
  // },
];

const Layout = () => {
  return (
    <>
      <Header nav={nav} />
      <Wrapper>
        <Main>
          <Outlet />
        </Main>
      </Wrapper>
    </>
  );
};
export default Layout;
