import React, { useCallback, useEffect, useState } from "react";

import { Badge, Button, Card, CardBody, CardHeader } from "reactstrap";

import { useAxiosPrivate, useToggle } from "hooks";
import { BarLoaderSpinner, BootstrapModal } from "components";
import { dateFormatter, trueTypeOf } from "utils";

const SearchStrategiesCriteria = ({ index, rowID }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i className="ion-information-circled"></i>
      </Button>

      <ComponentDialogue
        index={index}
        rowID={rowID}
        visible={visible}
        toggle={toggle}
      />
    </>
  );
};

const ComponentDialogue = React.memo(({ index, rowID, visible, toggle }) => {
  const authAxios = useAxiosPrivate();

  const [data, setData] = useState({});

  const [isLoading, setLoading] = useState(true);

  const retrieveData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authAxios.get(
        `/jobs/details/information/${rowID}/search-strategies-criteria`
      );
      const result = response.data;
      setData(result.content);
    } finally {
      setLoading(false);
    }
  }, [authAxios, rowID]);

  useEffect(() => {
    if (visible) {
      retrieveData();
    }
  }, [retrieveData, visible]);

  return (
    <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
      <BootstrapModal.Header>Index {index} Criteria</BootstrapModal.Header>
      <BootstrapModal.Body>
        {isLoading && <BarLoaderSpinner />}

        <div style={{ textAlign: "right" }}>
          <p>
            <small>Date Added: {renderDates(data?.date_added)}</small>
          </p>
        </div>

        <Card>
          <CardHeader>Criteria:</CardHeader>
          <CardBody>
            {data?.criteria?.map((content) => (
              <p key={content.category} className="contact-item border-bottom">
                <span className="fw-bold">{content.category}</span>
                {renderValue(content.value)}
              </p>
            ))}
          </CardBody>
        </Card>

        <Card className="mt-2">
          <CardHeader>Remarks:</CardHeader>
          <CardBody>
            <div>{data?.remarks}</div>
          </CardBody>
        </Card>
      </BootstrapModal.Body>
    </BootstrapModal>
  );
});

const renderDates = (date) => {
  let dt = date
    ? dateFormatter(date, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";
  return dt;
};

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

export { SearchStrategiesCriteria };
