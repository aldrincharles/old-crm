import React, { useContext, useState, useEffect, useCallback } from "react";

import { Button } from "reactstrap";

import { BootstrapModal } from "components";
import { useToggle, useAxiosPrivate } from "hooks";
import { FetchFilterContext } from "context/FetchFilter";
import { nullChecker, trueTypeOf } from "utils";
import { OrganizationSummaryDisplay } from "./OrganizationSummaryDisplay";

const requestParams = (object) => {
  if (trueTypeOf(object) === "undefined") return "";

  const filters = nullChecker(object);

  //convert object into a query string format
  const queryString = Object.keys(filters)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(filters[key])
    )
    .join("&");
  return queryString;
};

const OrganizationSummary = () => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button className="my-1" color="primary" onClick={toggle}>
        Summary
      </Button>
      <ComponentDialogue visible={visible} toggle={toggle} />
    </>
  );
};

const ComponentDialogue = React.memo(({ toggle = false, visible }) => {
  const { state } = useContext(FetchFilterContext);
  const authAxios = useAxiosPrivate();

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const retrieveData = useCallback(async () => {
    let sanitizedQuery = requestParams(state.search);
    setLoading(true);
    try {
      const response = await authAxios.get(
        `/organizations/summary?${sanitizedQuery}`
      );
      const result = response.data;
      setData(result.content);
    } finally {
      setLoading(false);
    }
  }, [authAxios, state.search]);

  useEffect(() => {
    if (visible) {
      retrieveData();
    }
  }, [retrieveData, visible]);

  return (
    <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
      <BootstrapModal.Header>Organization Summary</BootstrapModal.Header>

      <BootstrapModal.Body>
        <OrganizationSummaryDisplay data={data} isLoading={isLoading} />
      </BootstrapModal.Body>
    </BootstrapModal>
  );
});

export { OrganizationSummary };
