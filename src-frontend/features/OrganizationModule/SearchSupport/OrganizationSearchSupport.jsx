import React from "react";

import { useParams } from "react-router";

import { OrganizationStrategyMain } from "./Strategy/OrganizationStrategyMain";

import { HiringManagersMain } from "./HiringManagers/HiringManagersMain";
import { Container } from "reactstrap";
const OrganizationSearchSupport = () => {
  const { id } = useParams();

  return (
    <Container>
      <OrganizationStrategyMain id={id}></OrganizationStrategyMain>
      <HiringManagersMain id={id}></HiringManagersMain>
    </Container>
    // <Container>
    //   <div style={{ textAlign: "right" }}>
    //     <OrganizationStrategyAdd onAdd={refetch} />
    //   </div>
    //   <OrganizationStrategyDisplay
    //     data={data || []}
    //     isLoading={isLoading}
    //     onEdit={refetch}
    //     onDelete={onDelete}
    //   />
    // </Container>
  );
};

export { OrganizationSearchSupport };
