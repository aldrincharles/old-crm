import React from "react";

import { Table, Button } from "reactstrap";
import { toast } from "react-toastify";

import { useAxiosPrivate } from "hooks";
import { BarLoaderSpinner, Skeleton } from "components";

export const CommentsTab = ({
  infoData,
  isLoading = true,
  onRefetch = () => null,
}) => {
  const authAxios = useAxiosPrivate();

  const handleOnDelete = async (id) => {
    try {
      toast.promise(authAxios.delete(`/contact-information/${id}/comment`), {
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

  const renderRow = (item, index) => {
    return (
      <tr key={index}>
        <td>{isLoading ? <Skeleton /> : item.date}</td>
        <td>{isLoading ? <Skeleton /> : item.comment}</td>
        <td>{isLoading ? <Skeleton /> : item.author}</td>
        <td>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Button color="danger" onClick={() => handleOnDelete(item.id)}>
              Delete
            </Button>
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
            <th>Date</th>
            <th>Name</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{infoData?.display_long_term_comments?.map(renderRow)}</tbody>
      </Table>
    </>
  );
};
