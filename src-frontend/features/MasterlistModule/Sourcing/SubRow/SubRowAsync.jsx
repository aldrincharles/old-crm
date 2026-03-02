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
        `/masterlist/${value.contact.id}/sub`
      );
      const result = response.data;
      setData(result?.content);
      setLoading(false);
    };
    getData();
  }, [authAxios, value.contact.id]);

  return <SubRowsComponent data={data} isLoading={isLoading} />;
};

const SubRowsComponent = ({ data, isLoading }) => {
  const content1 = useMemo(
    () => [
      {
        label: "Connected With:",
        value: data?.connected_with,
      },
      {
        label: "Organization:",
        value: data?.organization.name,
      },
      {
        label: "Industry:",
        value: data?.industry,
      },
      {
        label: "Vertical:",
        value: data?.vertical,
      },
    ],
    [data]
  );

  const content2 = useMemo(
    () => [
      {
        label: "Category:",
        value: data?.candidate_category,
      },
      {
        label: "Sales Specializations:",
        value: (
          <>
            {data?.sales_specializations.map((specialization) => (
              <Badge className="m-2" color="info" key={specialization.value}>
                {specialization.label}
              </Badge>
            ))}
          </>
        ),
      },
      {
        label: "Salary:",
        value: (
          <>
            {data?.salary.base_salary} {data?.salary.currency}
          </>
        ),
      },
      {
        label: "Citizenship:",
        value: data?.citizenship,
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
