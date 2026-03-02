import React, { useCallback, useEffect, useState } from "react";
import { Button } from "reactstrap";

import { BarLoaderSpinner, BootstrapModal } from "components";
import { useToggle, useAxiosPrivate } from "hooks";

import { PlacementOfferForm } from "./PlacementOfferForm";

export const PlacementOffer = ({ reachout_id }) => {
  const [visible, toggle] = useToggle();
  return (
    <>
      <Button color="primary" onClick={toggle}>
        View Offer Details
      </Button>
      <PlacementOfferDialogue
        reachout_id={reachout_id}
        visible={visible}
        toggle={toggle}
      />
    </>
  );
};

const PlacementOfferDialogue = React.memo(
  ({ reachout_id, visible, toggle }) => {
    const authAxios = useAxiosPrivate();
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);

    const retrieveData = useCallback(async () => {
      setLoading(true);
      try {
        const response = await authAxios.get(
          `/jobs/reachout/get-offer-details/${reachout_id}`
        );
        const result = response.data;
        setData(result.content);
      } finally {
        setLoading(false);
      }
    }, [authAxios, reachout_id]);

    useEffect(() => {
      if (visible) {
        retrieveData();
      }
    }, [retrieveData, visible]);

    return (
      <BootstrapModal isOpen={visible} toggle={toggle} size="xl">
        <BootstrapModal.Header>Placement Offer Details</BootstrapModal.Header>
        <BootstrapModal.Body>
          {isLoading && <BarLoaderSpinner />}
          <PlacementOfferForm
            reachout_id={reachout_id}
            salary_details={data?.salary_details}
            offer_details={data?.offer_details}
            placement_details={data?.placement_details}
            onRefetch={retrieveData}
          />
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button form="placementOfferDetails" type="submit" color="success">
            Save
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    );
  }
);
