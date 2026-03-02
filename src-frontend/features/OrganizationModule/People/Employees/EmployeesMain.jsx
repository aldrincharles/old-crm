import React from "react";

import { useParams } from "react-router";

import { FetchProvider } from "context/FetchContext";
import { FetchFilterProvider } from "context/FetchFilter";

import { EmployeesDisplay } from "./EmployeesDisplay";
import { EmployeesFilter } from "./EmployeesFilter";

export const EmployeesMain = () => {
  const { id } = useParams();

  return (
    <FetchFilterProvider name={`organization_${id}_employees`}>
      <FetchProvider url={`organization/${id}/people/employees`}>
        <h3 style={{ textAlign: "left" }}>Employees</h3>
        <FetchProvider.Error />
        <EmployeesFilter />
        <EmployeesDisplay />
        <FetchProvider.Pagination />
      </FetchProvider>
    </FetchFilterProvider>
  );
};
