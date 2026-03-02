/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  Input,
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { useParams } from "react-router";

import {
  BootstrapModal,
  AnimatedSmartTable,
  BarLoaderSpinner,
} from "components";
import { useCustomForm, useToggle, useAxiosPrivate } from "hooks";
import { toast } from "react-toastify";

const options = [
  { value: "SMS", label: "SMS" },
  {
    value: "E-Mail",
    label: "E-Mail",
  },
  { value: "Linked In", label: "Linked In" },
  { value: "Connection Campaign", label: "Connection Campaign" },
];

export const SendOutFollowUp = ({ row }) => {
  const { reachout_id } = row.original;
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Follow Up
      </Button>
      <FollowUpDialogue
        reachout_id={reachout_id}
        visible={visible}
        toggle={toggle}
      />
    </>
  );
};

const FollowUpDialogue = React.memo(({ reachout_id, visible, toggle }) => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const initialState = { channel_used: "", date_last_contacted: new Date() };
  const { formData, handleSubmit, handleOnChange, reset } = useCustomForm(
    initialState,
    (e) => onSumbit(e)
  );

  const columns = useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        Cell: ({ row }) => {
          const { index } = row;
          return index + 1;
        },
      },
      {
        Header: "DATE",
        accessor: "date",
        disableFilters: true,
      },
      {
        Header: "MEDIUM",
        accessor: "channel",
        disableFilters: true,
      },
    ],
    []
  );

  const onSumbit = async (data) => {
    const response = authAxios.post(`/jobs/reachout/send-follow-up/${id}`, {
      reachout_id: reachout_id,
      ...data,
    });
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
      reset();
      retrieveData();
    } finally {
    }
  };

  const retrieveData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authAxios.get(
        `/jobs/reachout/get-follow-up/${id}/${reachout_id}`
      );
      const result = response.data;
      setData(result.content);
    } finally {
      setLoading(false);
    }
  }, [authAxios, id, reachout_id]);

  useEffect(() => {
    if (visible) {
      retrieveData();
    }
  }, [retrieveData, visible]);

  return (
    <BootstrapModal isOpen={visible} toggle={toggle} size="lg">
      <BootstrapModal.Body>
        {isLoading && <BarLoaderSpinner />}
        <AnimatedSmartTable data={data || []} columns={columns} />
        <Card className="mt-3">
          <CardBody>
            <Form inline onSubmit={handleSubmit}>
              <FormGroup className="mb-2 me-sm-5 mb-sm-0">
                <Label for="exampleEmail" className="me-sm-2">
                  Channel
                </Label>
                <Input
                  id="exampleEmail"
                  name="channel_used"
                  type="select"
                  value={formData.channel_use}
                  onChange={(e) => {
                    handleOnChange("channel_used", e.target.value);
                  }}
                  required
                >
                  <option value="">Select</option>
                  {options.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup className="mb-2 me-sm-5 mb-sm-0">
                <Label className="me-sm-2">Date Last Contacted</Label>
                <DatePicker
                  name="date_last_contacted"
                  dateFormat="MM/dd/yyyy"
                  selected={formData.date_last_contacted}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  onChange={(e) => handleOnChange("date_last_contacted", e)}
                />
              </FormGroup>
              <Button color="success" type="submit">
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </BootstrapModal.Body>
      <BootstrapModal.Footer toggle={toggle}></BootstrapModal.Footer>
    </BootstrapModal>
  );
});
