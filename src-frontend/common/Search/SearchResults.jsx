import React, { useContext } from "react";

import { useNavigate } from "react-router";
import { Button, Card, CardText, CardTitle } from "reactstrap";

import { FetchContext } from "context/FetchContext";

const SearchResults = ({ toggle }) => {
  const navigate = useNavigate();
  const { data: datas, error } = useContext(FetchContext);

  const onClick = (value) => {
    navigate(value);
    toggle();
  };

  return (
    <>
      {!error && (
        <div className="my-3">
          {datas?.map((data, index) => (
            <Card
              key={index}
              body
              className="shadow-sm p-3 mb-3 bg-white rounded"
            >
              <CardTitle tag="h5">{data.name}</CardTitle>
              {data.items.map((topic, index) => (
                <CardText key={index}>
                  <b>{`${topic.label}:`}</b> {topic.value}
                </CardText>
              ))}
              <Button color="primary" onClick={() => onClick(data.link)}>
                Details
              </Button>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export { SearchResults };
