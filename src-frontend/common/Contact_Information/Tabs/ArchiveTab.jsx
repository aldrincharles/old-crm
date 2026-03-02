import React from "react";

import { Table, Button } from "reactstrap";
import { toast } from "react-toastify";
import { useAxiosPrivate, useToggle } from "hooks";

import { BarLoaderSpinner, BootstrapModal, Skeleton } from "components";

const Delete = ({ archive_id, fileName, onRefetch = () => null }) => {
  const authAxios = useAxiosPrivate();
  const [visible, toggle] = useToggle();

  const handleDelete = async () => {
    const response = authAxios.delete(
      `/contact-information/${archive_id}/archive`
    );
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
      onRefetch();
    } finally {
    }
  };

  return (
    <>
      <Button color="danger" onClick={toggle}>
        Delete
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} backdrop="static">
        <BootstrapModal.Header>Warning</BootstrapModal.Header>
        <BootstrapModal.Body>
          Are you sure you want to delete <b>&quot;{fileName}&quot;</b>?
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};

export const ArchiveTab = ({
  infoData,
  isLoading = true,
  onRefetch = () => null,
}) => {
  const renderRow = (item, index) => {
    return (
      <tr key={index}>
        <td>{isLoading ? <Skeleton /> : item.date}</td>
        <td>
          {isLoading ? <Skeleton /> : <a href={item.link}>{item.fileName}</a>}
        </td>
        <td>{isLoading ? <Skeleton /> : item.uploader}</td>
        <td>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Delete
              archive_id={item.id}
              fileName={item.fileName}
              onRefetch={onRefetch}
            />
          )}
        </td>
      </tr>
    );
  };

  return (
    <>
      {isLoading && <BarLoaderSpinner />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="wd-10p">Date Added</th>
            <th className="wd-75p">File Name</th>
            <th className="wd-10p">Uploader</th>
            <th className="wd-5"></th>
          </tr>
        </thead>
        <tbody>{infoData?.display_archives?.map(renderRow)}</tbody>
      </Table>
    </>
  );
};
