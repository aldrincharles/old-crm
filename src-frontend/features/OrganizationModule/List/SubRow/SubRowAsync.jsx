import React, { useState, useEffect, useMemo } from "react";

import { Badge, Row, Col, Card, CardBody } from "reactstrap";

import { Skeleton } from "components";
import { useAxiosPrivate } from "hooks";

export const SubRowAsync = ({ row }) => {
  const value = row.original;
  const authAxios = useAxiosPrivate();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await authAxios.get(
        `/organizations/${value.organization_id}/sub`
      );
      const result = response.data;
      setData(result?.content);
      setLoading(false);
    };
    getData();
  }, [authAxios, value.organization_id]);

  return <SubRowsComponent data={data} isLoading={isLoading} />;
};

const SubRowsComponent = ({ data, isLoading }) => {
  const content1 = useMemo(
    () => [
      {
        label: "Sales:",
        value: data?.sales,
      },
      {
        label: "Pre Sales:",
        value: data?.pre_sales,
      },
      {
        label: "Channel:",
        value: data?.channel,
      },
    ],
    [data]
  );

  const content2 = useMemo(
    () => [
      {
        label: "People:",
        value: data?.people,
      },
      {
        label: "APAC HQ:",
        value: data?.apac_hq,
      },
      {
        label: "APAC Offices:",
        value: (
          <>
            {data?.apac_offices?.map((office) => (
              <Badge className="m-1" color="info" key={office.value}>
                {office.label}
              </Badge>
            ))}
          </>
        ),
      },
    ],
    [data]
  );

  return (
    <div className="p-3">
      <Card>
        <CardBody>
          <Row>
            <Col>
              {content1.map((content) => (
                <p
                  key={content.label}
                  className={isLoading ? null : "contact-item border-bottom"}
                >
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <span className="fw-bold">{content.label}</span>
                      <span>{content.value}</span>
                    </>
                  )}
                </p>
              ))}
            </Col>
            <Col>
              {content2.map((content) => (
                <p
                  key={content.label}
                  className={isLoading ? null : "contact-item border-bottom"}
                >
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                      <span className="fw-bold">{content.label}</span>
                      <span>{content.value}</span>
                    </>
                  )}
                </p>
              ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
