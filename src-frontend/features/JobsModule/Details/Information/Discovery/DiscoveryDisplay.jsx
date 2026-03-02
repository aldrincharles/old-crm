import React from "react";

import { useParams } from "react-router";
import { Button, Table } from "reactstrap";
import { toast } from "react-toastify";

import { useAxiosPrivate } from "hooks";
import { ContactInformation } from "common";

const DiscoveryDisplay = ({ data, onDelete }) => {
  const { id } = useParams();
  const authAxios = useAxiosPrivate();

  const handleOndelete = async (discoveryID) => {
    const response = authAxios.delete(
      `/jobs/${id}/details/information/interviewed-candidates`,
      {
        data: { id: discoveryID },
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

    onDelete(discoveryID);
  };

  return (
    <Table borderless>
      <thead>
        <tr>
          <th>Name</th>
          <th className="no-print"></th>
          <th>Organization</th>
          <th className="no-print"></th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 &&
          data.map((discovery, index) => (
            <tr key={index}>
              <td style={{ width: 500 }}>{discovery.name}</td>
              <td style={{ width: 100 }} className="no-print">
                <ContactInformation
                  modal_contact_id={discovery.contact_id}
                  shortcut_linked_in={discovery.linked_in}
                />
              </td>
              <td style={{ width: 500 }}>{discovery.organization}</td>
              <td style={{ width: 100 }} className="no-print">
                <Button
                  className="ms-2"
                  color="danger"
                  onClick={() => {
                    handleOndelete(discovery.id);
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

export { DiscoveryDisplay };
