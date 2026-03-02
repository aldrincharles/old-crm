import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "reactstrap";

import { BootstrapModal, Skeleton } from "components";
import { useAxiosPrivate, useToggle } from "hooks";
import { dateFormatter } from "utils";

export const MasterListPreferences = ({ data }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button
        color="primary"
        disabled={!data.contact.looking_for}
        onClick={toggle}
      >
        Opportunity
      </Button>
      <Component
        contact_id={data.contact.id}
        visible={visible}
        toggle={toggle}
      />
    </>
  );
};

export const Component = React.memo(({ contact_id, visible, toggle }) => {
  const authAxios = useAxiosPrivate();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const retrieveData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authAxios.get(
        `/masterlist/${contact_id}/preference`
      );
      const result = response.data;
      setData(result.content);
    } finally {
      setLoading(false);
    }
  }, [authAxios, contact_id]);

  const contents = useMemo(
    () => [
      {
        name: "Date Looking to Move",
        content: data?.date_looking_to_move
          ? dateFormatter(data.date_looking_to_move, {
              month: "long",
              year: "numeric",
            })
          : null,
      },
      {
        name: "Type of Company",
        content: data?.type_of_company,
      },
      {
        name: "Position to Move Into",
        content: data?.position,
      },
      {
        name: "Industry",
        content: data?.industry,
      },
    ],
    [data]
  );

  useEffect(() => {
    if (visible) {
      retrieveData();
    }
  }, [retrieveData, visible]);

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="sm">
      <BootstrapModal.Header>Preferences</BootstrapModal.Header>
      <BootstrapModal.Body>
        {contents.map((c) => (
          <React.Fragment key={c.name}>
            <span className="fw-bold">{c.name}: </span>
            {isLoading ? <Skeleton /> : <p key={c.name}>{c.content}</p>}
          </React.Fragment>
        ))}
      </BootstrapModal.Body>
      <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
    </BootstrapModal>
  );
});
