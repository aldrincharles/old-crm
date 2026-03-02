import React from "react";

import { Button } from "reactstrap";

import { FetchProvider } from "context/FetchContext";
import { FetchFilterProvider } from "context/FetchFilter";
import { useToggle } from "hooks";
import { Sidebar } from "components";

import { SearchFilter } from "./SearchFilter";
import { SearchResults } from "./SearchResults";

const Search = () => {
  const [visible, toggle] = useToggle();
  return (
    <>
      <Button
        style={{ color: "whitesmoke" }}
        outline
        className="me-2"
        onClick={toggle}
      >
        <i className="ion-search"></i>
      </Button>
      <FetchFilterProvider name="search">
        <FetchProvider url={`/search`} skip>
          <Sidebar isOpen={visible} toggle={toggle} direction="end">
            <Sidebar.Header toggle={toggle}>Search:</Sidebar.Header>
            <Sidebar.Body>
              <SearchFilter />
              {/* <FetchProvider.LoaderSpinner title="Searching..." /> */}
              <FetchProvider.Error />
              <SearchResults toggle={toggle} />
              <FetchProvider.Pagination sizeOption={[10, 20]} />
            </Sidebar.Body>
          </Sidebar>
        </FetchProvider>
      </FetchFilterProvider>
    </>
  );
};

export { Search };
