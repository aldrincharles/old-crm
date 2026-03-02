import React, { useState } from "react";

import { Table, Form, Input, Label, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import { useParams } from "react-router";

import { BootstrapModal } from "components";
import { useToggle, useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

export const SLAEdit = ({ data, onSubmit = () => {} }) => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();
  const [visible, toggle] = useToggle();
  const initialFormData = {
    sla_sourcing: data?.sla_sourcing || "",
    sla_reach_out: data?.sla_reach_out || "",
    sla_screening: data?.sla_screening || "",
    sla_candidate_forwarded: data?.sla_candidate_forwarded || "",
    sla_hiring_manager_interview: data?.sla_hiring_manager_interview || "",
    sla_offer: data?.sla_offer || "",

    sla_sourcing_date: data?.sla_sourcing_date
      ? new Date(data.sla_sourcing_date)
      : new Date(),
    sla_sourcing_date_end: data?.sla_sourcing_date_end
      ? new Date(data.sla_sourcing_date_end)
      : new Date(),

    sla_screening_date: data?.sla_screening_date
      ? new Date(data.sla_screening_date)
      : new Date(),
    sla_screening_date_end: data?.sla_screening_date_end
      ? new Date(data.sla_screening_date_end)
      : new Date(),

    sla_candidate_forwarded_date: data?.sla_candidate_forwarded_date
      ? new Date(data.sla_candidate_forwarded_date)
      : new Date(),
    sla_candidate_forwarded_date_end: data?.sla_candidate_forwarded_date_end
      ? new Date(data.sla_candidate_forwarded_date_end)
      : new Date(),

    sla_hiring_manager_interview_date: data?.sla_hiring_manager_interview_date
      ? new Date(data?.sla_hiring_manager_interview_date)
      : new Date(),
    sla_hiring_manager_interview_date_end:
      data?.sla_hiring_manager_interview_date_end
        ? new Date(data.sla_hiring_manager_interview_date_end)
        : new Date(),

    sla_placement_date: data?.sla_placement_date
      ? new Date(data.sla_placement_date)
      : new Date(),
    sla_placement_date_end: data?.sla_placement_date_end
      ? new Date(data.sla_placement_date_end)
      : new Date(),
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleOpenModal = () => {
    toggle();
  };

  const handleOnChange = (name, event) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: event ? event : "",
      };
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const response = authAxios.put(`/jobs/${id}/sla`, { ...formData });
    await toast.promise(response, {
      pending: "Pending",
      success: {
        render({ data }) {
          const message = data.data?.message;
          return `${message} 👌`;
        },
      },
      error: "Oops! Something went wrong 🤯",
    });
    onSubmit(formData);
    toggle();
  };

  return (
    <>
      <Button color="primary" onClick={handleOpenModal}>
        <i className="ion-edit" />
      </Button>
      <BootstrapModal size="xl" isOpen={visible} toggle={toggle}>
        <BootstrapModal.Header>Edit SLA Details</BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form id="EditJobSLAForm" onSubmit={handleOnSubmit}>
            <Table className="my-4">
              <thead>
                <tr>
                  <th colSpan="2">SLA</th>
                  <th>Date Started</th>
                  <th>Date Ended</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Label>Sourcing</Label>
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="sla_sourcing"
                      value={formData.sla_sourcing}
                      onChange={(e) =>
                        handleOnChange("sla_sourcing", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <DatePicker
                      name="sla_sourcing_date"
                      selected={formData.sla_sourcing_date}
                      onChange={(e) => handleOnChange("sla_sourcing_date", e)}
                      selectsStart
                      startDate={formData.sla_sourcing_date}
                      endDate={formData.sla_sourcing_date_end}
                    />
                  </td>
                  <td>
                    <DatePicker
                      name="sla_sourcing_date_end"
                      selected={formData.sla_sourcing_date_end}
                      onChange={(e) =>
                        handleOnChange("sla_sourcing_date_end", e)
                      }
                      selectsEnd
                      startDate={formData.sla_sourcing_date}
                      endDate={formData.sla_sourcing_date_end}
                      minDate={formData.sla_sourcing_date}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <Label>Screening</Label>
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="sla_screening"
                      value={formData.sla_screening}
                      onChange={(e) =>
                        handleOnChange("sla_screening", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <DatePicker
                      name="sla_screening_date"
                      selected={formData.sla_screening_date}
                      onChange={(e) => handleOnChange("sla_screening_date", e)}
                      selectsStart
                      startDate={formData.sla_screening_date}
                      endDate={formData.sla_screening_date_end}
                    />
                  </td>
                  <td>
                    <DatePicker
                      name="sla_screening_date_end"
                      selected={formData.sla_screening_date_end}
                      onChange={(e) =>
                        handleOnChange("sla_screening_date_end", e)
                      }
                      startDate={formData.sla_screening_date}
                      endDate={formData.sla_screening_date_end}
                      minDate={formData.sla_screening_date}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label>Candidate Forwarded</Label>
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="sla_candidate_forwarded"
                      value={formData.sla_candidate_forwarded}
                      onChange={(e) =>
                        handleOnChange(
                          "sla_candidate_forwarded",
                          e.target.value
                        )
                      }
                      required
                    />
                  </td>
                  <td>
                    <DatePicker
                      name="sla_candidate_forwarded_date"
                      dateFormat="MM/dd/yyyy"
                      selected={formData.sla_candidate_forwarded_date}
                      onChange={(e) =>
                        handleOnChange("sla_candidate_forwarded_date", e)
                      }
                      selectsStart
                      startDate={formData.sla_candidate_forwarded_date}
                      endDate={formData.sla_candidate_forwarded_date_end}
                    />
                  </td>
                  <td>
                    <DatePicker
                      name="sla_candidate_forwarded_date_end"
                      dateFormat="MM/dd/yyyy"
                      selected={formData.sla_candidate_forwarded_date_end}
                      onChange={(e) =>
                        handleOnChange("sla_candidate_forwarded_date_end", e)
                      }
                      startDate={formData.sla_candidate_forwarded_date}
                      endDate={formData.sla_candidate_forwarded_date_end}
                      minDate={formData.sla_candidate_forwarded_date}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label>Hiring Manager Interview</Label>
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="sla_hiring_manager_interview"
                      value={formData.sla_hiring_manager_interview}
                      onChange={(e) =>
                        handleOnChange(
                          "sla_hiring_manager_interview",
                          e.target.value
                        )
                      }
                      required
                    />
                  </td>
                  <td>
                    <DatePicker
                      name="sla_hiring_manager_interview_date"
                      dateFormat="MM/dd/yyyy"
                      selected={formData.sla_hiring_manager_interview_date}
                      onChange={(e) =>
                        handleOnChange("sla_hiring_manager_interview_date", e)
                      }
                      selectsStart
                      startDate={formData.sla_hiring_manager_interview_date}
                      endDate={formData.sla_hiring_manager_interview_date_end}
                    />
                  </td>
                  <td>
                    <DatePicker
                      name="sla_hiring_manager_interview_date_end"
                      dateFormat="MM/dd/yyyy"
                      selected={formData.sla_hiring_manager_interview_date_end}
                      onChange={(e) =>
                        handleOnChange(
                          "sla_hiring_manager_interview_date_end",
                          e
                        )
                      }
                      startDate={formData.sla_hiring_manager_interview_date}
                      endDate={formData.sla_hiring_manager_interview_date_end}
                      minDate={formData.sla_hiring_manager_interview_date}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label>Offer</Label>
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="sla_offer"
                      value={formData.sla_offer}
                      onChange={(e) =>
                        handleOnChange("sla_offer", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <DatePicker
                      name="sla_placement_date"
                      dateFormat="MM/dd/yyyy"
                      selected={formData.sla_placement_date}
                      onChange={(e) => handleOnChange("sla_placement_date", e)}
                      selectsStart
                      startDate={formData.sla_offer_date}
                      endDate={formData.sla_placement_date_end}
                    />
                  </td>
                  <td>
                    <DatePicker
                      name="sla_placement_date_end"
                      dateFormat="MM/dd/yyyy"
                      selected={formData.sla_placement_date_end}
                      onChange={(e) =>
                        handleOnChange("sla_placement_date_end", e)
                      }
                      startDate={formData.sla_placement_date}
                      endDate={formData.sla_placement_date_end}
                      minDate={formData.sla_placement_date}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label>Reach Out</Label>
                  </td>
                  <td>
                    <Input
                      type="number"
                      name="sla_reach_out"
                      value={formData.sla_reach_out}
                      onChange={(e) =>
                        handleOnChange("sla_reach_out", e.target.value)
                      }
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
          {/* <pre>
          {JSON.stringify(
            {
              ...formData,
            },
            null,
            2
          )}
        </pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button color="success" type="submit" form="EditJobSLAForm">
            SUBMIT
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
