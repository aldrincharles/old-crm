import React, { useState, useEffect } from "react";

import { Input, Button, Row, Col } from "reactstrap";

import { Editable } from "components";
import { useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

export const ListItemEdit = ({
  data,
  url,
  onRefetch,
  onProcessKeys = () => {},
}) => {
  const authAxios = useAxiosPrivate();
  const [value, setValue] = useState(data?.item);

  useEffect(() => {
    setValue(data?.item);
  }, [data]);

  const onHandleBlur = async () => {
    try {
      toast.promise(
        authAxios.put(url, {
          item_id: data?.item_id,
          item: value,
        }),
        {
          pending: "Pending",
          success: {
            render({ data }) {
              const message = data.data?.message;
              return `${message} 👌`;
            },
          },
          error: "Oops! Something went wrong 🤯",
        }
      );

      onProcessKeys(value);
    } catch (error) {}
  };

  const onDelete = async () => {
    try {
      const response = authAxios.delete(url, {
        data: { item_id: data?.item_id },
      });

      toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });

      onRefetch();
    } catch (error) {}
  };

  return (
    <Row>
      <Col>
        <Editable text={data?.item} type="input" onBlur={onHandleBlur}>
          <Input
            autoFocus
            type="text"
            value={value}
            maxLength={200}
            width={10}
            onChange={(e) => setValue(e.target.value)}
          />
        </Editable>
      </Col>
      <Col style={{ textAlign: "right" }}>
        <Button color="danger" onClick={onDelete}>
          <i className="ion-trash-a" />
        </Button>
      </Col>
    </Row>
  );
};
