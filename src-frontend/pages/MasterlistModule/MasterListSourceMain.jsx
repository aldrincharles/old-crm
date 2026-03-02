import React, { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Row, Col } from "reactstrap";
import { toast } from "react-toastify";

import { useFetch, useToggle, useAxiosPrivate } from "hooks";
import { BootstrapModal, PageTitle } from "components";
import { ExportCSV } from "common";
import { FetchProvider } from "context/FetchContext";
import { FetchFilterProvider } from "context/FetchFilter";

import {
  MasterListDetails,
  MasterListEdit,
  ExportMasterList,
  MasterListSourceFilter,
  MasterListSourceDisplay,
} from "features/MasterlistModule/Sourcing";

const MasterListSourceMain = () => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState(true);
  const [visible, toggle] = useToggle();
  const details = useFetch({
    initialUrl: `/masterlist/${id}/details`,
  });

  const handleConfirmation = () => {
    toggle();
    handleDelete();
  };

  const handleDelete = async () => {
    setButtonState(false);
    const response = authAxios.delete(`/masterlist/${id}`);
    try {
      await toast.promise(response, {
        pending: {
          render() {
            return "Pending";
          },
        },
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: {
          render() {
            return "Oops! Something went wrong 🤯";
          },
        },
      });
      navigate("/masterlists");
    } finally {
      setButtonState(false);
    }
  };

  return (
    <>
      <PageTitle title={`Details - Master Lists`} />
      <BootstrapModal isOpen={visible} toggle={toggle} backdrop="static">
        <BootstrapModal.Header>Warning</BootstrapModal.Header>
        <BootstrapModal.Body>
          <p>
            Are you sure you want to delete
            <b>&quot;{details.data?.title}&quot;</b>?
          </p>
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button color="danger" onClick={handleConfirmation}>
            Delete
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>

      <FetchFilterProvider name={`masterlist_${id}_source`}>
        <FetchProvider url={`masterlist/${id}`}>
          <Row className="mb-5 ">
            <Col style={{ textAlign: "left" }}>
              <MasterListDetails data={details?.data} />
            </Col>
            <Col style={{ textAlign: "right" }}>
              {details?.data && (
                <ButtonGroup vertical>
                  <MasterListEdit
                    data={details?.data}
                    onRefetch={details?.refetch}
                  />

                  <ExportMasterList id={id} />
                  <ExportCSV
                    className="my-1"
                    color="info"
                    url={`/masterlist/${id}/csv`}
                    fileName={`Masterlist_Export_${details.data?.title}`}
                  >
                    EXPORT TO CSV
                  </ExportCSV>
                  <Button
                    disabled={!buttonState}
                    color="danger"
                    onClick={toggle}
                  >
                    {buttonState ? <div>Delete</div> : <div>Processing...</div>}
                  </Button>
                </ButtonGroup>
              )}
            </Col>
          </Row>

          <MasterListSourceFilter />
          <MasterListSourceDisplay />
          <FetchProvider.Pagination />
        </FetchProvider>
      </FetchFilterProvider>
    </>
  );
};

export default MasterListSourceMain;
