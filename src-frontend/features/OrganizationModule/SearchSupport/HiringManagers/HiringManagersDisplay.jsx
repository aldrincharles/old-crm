import React from "react";

import { useParams } from "react-router";
import { Button, ButtonGroup, Table } from "reactstrap";
import { toast } from "react-toastify";

import { useAxiosPrivate } from "hooks";
import { ContactInformation } from "common";
import { HiringManagersEdit } from "./HiringManagerEdit";

const HiringManagersDisplay = ({ data, onDelete, onRefetch }) => {
  const { id } = useParams();
  const authAxios = useAxiosPrivate();

  const handleOndelete = async (hiringManagerID) => {
    const response = authAxios.delete(
      `organization/${id}/search-support/hiring-managers`,
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
    <Table bordered>
      <thead>
        <tr>
          <th>Name</th>
          <th></th>
          <th>Career Summary/Background</th>
          <th>Interview Style</th>
          <th>Interview Questions</th>
          <th>General Overview</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 &&
          data.map((hiringManager, index) => (
            <tr key={index}>
              <td>{hiringManager.name}</td>
              <td>
                <ContactInformation
                  modal_contact_id={hiringManager.contact_id}
                  shortcut_linked_in={hiringManager.linked_in}
                ></ContactInformation>
              </td>
              <td>{hiringManager.career_summary}</td>
              <td>{hiringManager.interview_style}</td>
              <td className="white-space-display">
                {hiringManager.interview_questions}
              </td>
              <td>{hiringManager.general_overview}</td>
              <td style={{ width: 100 }}>
                <ButtonGroup horizontal>
                  <HiringManagersEdit
                    data={hiringManager}
                    onRefetch={onRefetch}
                  ></HiringManagersEdit>
                  <Button
                    className="mx-1"
                    color="danger"
                    onClick={() => {
                      handleOndelete(hiringManager.id);
                    }}
                  >
                    <i className="ion-trash-a" />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export { HiringManagersDisplay };
