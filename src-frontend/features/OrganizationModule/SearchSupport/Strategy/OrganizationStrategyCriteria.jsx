import React, { useCallback, useEffect, useState } from "react";

import { Badge, Button } from "reactstrap";

import { useAxiosPrivate, useToggle } from "hooks";
import { BarLoaderSpinner, BootstrapModal } from "components";
import { trueTypeOf } from "utils";

const OrganizationStrategyCriteria = ({ rowID }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i className="ion-information-circled"></i>
      </Button>

      <ComponentDialogue rowID={rowID} visible={visible} toggle={toggle} />
    </>
  );
};

const ComponentDialogue = React.memo(({ rowID, visible, toggle }) => {
  const authAxios = useAxiosPrivate();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const retrieveData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authAxios.get(
        `/organization/${rowID}/strategy-criteria`
      );
      const result = response.data;
      setData(result.content);
    } finally {
      setLoading(false);
    }
  }, [authAxios, rowID]);

  const renderValue = (value) => {
    switch (trueTypeOf(value)) {
      case "array":
        return (
          <span>
            {value.map((content) => (
              <Badge className="m-1" color="info" key={content}>
                {content}
              </Badge>
            ))}
          </span>
        );
      case "string":
        return <span>{value}</span>;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (visible) {
      retrieveData();
    }
  }, [retrieveData, visible]);

  return (
    <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
      <BootstrapModal.Header>Criteria</BootstrapModal.Header>
      <BootstrapModal.Body>
        {isLoading && <BarLoaderSpinner />}
        {data?.map((content) => (
          <p key={content.category} className="contact-item border-bottom">
            <span className="fw-bold">{content.category}</span>
            {renderValue(content.value)}
          </p>
        ))}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
});

export { OrganizationStrategyCriteria };
