import React, { useContext } from "react";

import styled from "styled-components";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "reactstrap";

import { NavLink as CustomLink } from "components";
import { useToggle, useLogout } from "hooks";
import { AuthContext } from "context/Auth";

import { Search } from "common";

const HeaderBar = styled.header`
  width: 100%;
  height: 64px;
  position: fixed;
  background-color: #0f264a;
  z-index: 1;
`;

export const Header = ({ nav }) => {
  const { auth } = useContext(AuthContext);
  const logout = useLogout();
  const [isOpen, setIsOpen] = useToggle();
  const [visible, toggle] = useToggle();

  return (
    <HeaderBar>
      <Navbar dark expand="md">
        <NavbarBrand className="text-info display-1 brand">
          <span
            className="h3"
            style={{ fontFamily: "Times New Roman", color: "white" }}
          >
            <CustomLink
              className="nav-link"
              activeClassName="nav-link active"
              to="dashboard"
            >
              Itel
            </CustomLink>
          </span>
        </NavbarBrand>
        <NavbarToggler onClick={setIsOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {nav.map((data, index) => (
              <NavItem className="fw-bold" key={index}>
                <CustomLink
                  className="nav-link"
                  activeClassName="nav-link active"
                  // activeStyle={{ cursor: "text" }}
                  to={data.to}
                >
                  {data.name}
                </CustomLink>
              </NavItem>
            ))}
            {auth?.access_limit === 0 && (
              <NavItem className="fw-bold">
                <CustomLink
                  className="nav-link"
                  activeClassName="nav-link active"
                  to="users"
                >
                  Users
                </CustomLink>
              </NavItem>
            )}
          </Nav>
          <Search />
          <Dropdown isOpen={visible} toggle={toggle}>
            <DropdownToggle
              style={{ color: "whitesmoke" }}
              outline
              caret
            >{`${auth?.first_name} ${auth?.last_name}`}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={logout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar>
    </HeaderBar>
  );
};
