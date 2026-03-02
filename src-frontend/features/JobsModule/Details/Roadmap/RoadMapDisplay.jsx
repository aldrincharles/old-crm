import React from "react";

import { Button, ButtonGroup, Table } from "reactstrap";
import { useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";
import { useParams } from "react-router";

import { RoadMapEdit } from "./RoadMapEdit";

const RoadMapDisplay = ({ data, onEdit, onDelete }) => {
  const { id } = useParams();
  const authAxios = useAxiosPrivate();

  const handleUpdate = (index, data) => {
    Object.keys(data).map((key) => {
      return onEdit(index, key, data[key]);
    });
  };

  const handleOndelete = async (roadmapID) => {
    const response = authAxios.delete(`/jobs/${id}/details/road-map`, {
      data: { id: roadmapID },
    });
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

    onDelete(roadmapID);
  };

  return (
    <>
      <Table borderless>
        <thead>
          <tr>
            <th>Stage Name</th>
            <th>Hiring Manager</th>
            <th>Interview Questions</th>
            <th>Remarks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data.map((roadmap, index) => (
              <tr key={index}>
                <td>{roadmap.stage_name}</td>
                <td>{roadmap.hiring_manager.label}</td>
                <td>{roadmap.interview_questions}</td>
                <td>{roadmap.remarks}</td>
                <td style={{ width: 100 }}>
                  <ButtonGroup>
                    <RoadMapEdit
                      data={roadmap}
                      onEdit={(e) => {
                        handleUpdate(index, e);
                      }}
                    />
                    <Button
                      color="danger"
                      onClick={() => {
                        handleOndelete(roadmap.id);
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
      {/* {data?.length > 0 &&
        data.map((roadmap, index) => (
          <React.Fragment key={index}>
            <div style={{ textAlign: "right" }}>
              <RoadMapEdit
                data={roadmap}
                onEdit={(e) => {
                  handleUpdate(index, e);
                }}
              />
              <Button
                className="ms-2"
                color="danger"
                onClick={() => {
                  onDelete(roadmap.stage_name);
                }}
              >
                X
              </Button>
            </div>
            <Card className="my-3">
              <CardBody>
                <p className="contact-item border-bottom">
                  <span className="fw-bold">Stage Name: </span>
                  <span>{roadmap.stage_name}</span>
                </p>
                <p className="contact-item border-bottom">
                  <span className="fw-bold">Hiring Manager: </span>
                  <span>{roadmap.hiring_manager.label}</span>
                </p>
                <p className="contact-item border-bottom">
                  <span className="fw-bold">Interview Questions: </span>
                  <span>{roadmap.interview_questions}</span>
                </p>
                <p className="contact-item border-bottom">
                  <span className="fw-bold">Remarks: </span>
                  <span>{roadmap.remarks}</span>
                </p>
              </CardBody>
            </Card>
          </React.Fragment>
        ))} */}
    </>
  );
};

export { RoadMapDisplay };
