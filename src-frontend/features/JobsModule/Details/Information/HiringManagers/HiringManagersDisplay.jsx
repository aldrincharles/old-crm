import React from "react";

import { useParams } from "react-router";
import { Button, Table } from "reactstrap";
import { toast } from "react-toastify";

import { useAxiosPrivate } from "hooks";

const HiringManagersDisplay = ({ data, onDelete }) => {
  const { id } = useParams();
  const authAxios = useAxiosPrivate();

  const handleOndelete = async (hiringManagerID) => {
    const response = authAxios.delete(
      `/jobs/${id}/details/information/hiring-managers`,
      {
        data: { id: hiringManagerID },
      }
    );
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

    onDelete(hiringManagerID);
  };

  return (
    <Table borderless>
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Linkedin</th>
          <th>Email</th>
          <th className="no-print"></th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 &&
          data.map((hiringManager, index) => (
            <tr key={index}>
              <td>{hiringManager.name}</td>
              <td>{hiringManager.position}</td>
              <td>
                <a
                  href={hiringManager.linked_in}
                  target="_blank"
                  rel="noreferrer"
                >
                  {hiringManager.linked_in}
                </a>
              </td>

              <td>{hiringManager.work_email}</td>
              <td style={{ width: 100 }} className="no-print">
                <Button
                  className="ms-2"
                  color="danger"
                  onClick={() => {
                    handleOndelete(hiringManager.id);
                  }}
                >
                  <i className="ion-trash-a" />
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export { HiringManagersDisplay };
