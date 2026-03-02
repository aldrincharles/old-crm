import React, { useState } from "react";

import { Button, Form, Alert, FormGroup } from "reactstrap";
import { toast } from "react-toastify";

import { Conditional, Skeleton, InputWrap } from "components";
import { useAxiosPrivate } from "hooks";

export const SalaryTab = ({
  infoData,
  modal_contact_id,
  isLoading = true,
  onRefetch = () => null,
}) => {
  const authAxios = useAxiosPrivate();

  const initialState = {
    salaryComment: "",
  };
  const [userInput, setUserInput] = useState(initialState);
  const [error, setError] = useState("");

  const section0 = [
    { label: "First Name:", value: infoData?.display_salary_first_name },
    { label: "Middle Name:", value: infoData?.display_salary_middle_name },
    { label: "Last Name:", value: infoData?.display_salary_last_name },
  ];
  const section1 = [
    { label: "Address:", value: infoData?.display_salary_address },
    { label: "Current Company:", value: infoData?.display_salary_company },
    { label: "Nationality:", value: infoData?.display_salary_nationality },
    {
      label: "Work Pass Type:",
      value: infoData?.display_salary_work_pass_type,
    },
    {
      label: "Passport Number:",
      value: infoData?.display_salary_passport_number,
    },
  ];
  const section2 = [
    { label: "Currency:", value: infoData?.display_salary_currency },
    { label: "Annual Base salary:", value: infoData?.display_salary_base },
    {
      label: "Annual Commission / Incentive:",
      value: infoData?.display_salary_incentives,
    },
  ];
  const section3 = [
    { label: "OTE Split:", value: infoData?.display_salary_split },
    {
      label: "Travel Allowance:",
      value: infoData?.display_salary_travel_allowance,
    },
  ];
  const section4 = [
    { label: "RSU/Stock Options:", value: infoData?.display_salary_rsu_stock },
    { label: "Annual Leave:", value: infoData?.display_salary_leave },
    { label: "Notice Period:", value: infoData?.display_salary_notice_period },
    {
      label: "Candidate Comments:",
      value: infoData?.display_salary_candidate_comments,
    },
    {
      label: "Internal Comment:",
      value: infoData?.display_salary_internal_comments,
    },
  ];

  const handleChange = (event) => {
    setUserInput({
      ...userInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      toast.promise(
        authAxios.post(
          `/contact-information/${modal_contact_id}/salary-comment`,
          {
            internal_comment: userInput.salaryComment,
          }
        ),
        {
          pending: "Pending",
          success: {
            render({ data }) {
              const message = data.data?.message;
              return `${message} 👌`;
            },
          },
          error: "Oops! Something went wrong 🤯",
        }
      );

      setUserInput(initialState);
      onRefetch();
      setError(null);
    } catch (error) {}
  };

  return (
    <>
      <Conditional if={error}>
        <Alert color="danger">{error}</Alert>
      </Conditional>
      {section0.map((data, index) => (
        <p
          key={index}
          className={isLoading ? null : "contact-item border-bottom"}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <span>{data.label}</span>
              <span className="tx-inverse">{data.value}</span>
            </>
          )}
        </p>
      ))}
      <p className="contact-item"></p>
      {section1.map((data, index) => (
        <p
          key={index}
          className={isLoading ? null : "contact-item border-bottom"}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <span>{data.label}</span>
              <span className="tx-inverse">{data.value}</span>
            </>
          )}
        </p>
      ))}
      <p className="contact-item"></p>
      {section2.map((data, index) => (
        <p
          key={index}
          className={isLoading ? null : "contact-item border-bottom"}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <span>{data.label}</span>
              <span className="tx-inverse">{data.value}</span>
            </>
          )}
        </p>
      ))}

      <h4 className="mt-5" style={{ textAlign: "center" }}>
        Total Annual Package
      </h4>
      {section3.map((data, index) => (
        <p
          key={index}
          className={isLoading ? null : "contact-item border-bottom"}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <span>{data.label}</span>
              <span className="tx-inverse">{data.value}</span>
            </>
          )}
        </p>
      ))}
      <p className="contact-item"></p>
      {section4.map((data, index) => (
        <p
          key={index}
          className={isLoading ? null : "contact-item border-bottom"}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <span>{data.label}</span>
              <span className="tx-inverse">{data.value}</span>
            </>
          )}
        </p>
      ))}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputWrap
            name="salaryComment"
            type="textarea"
            value={userInput.salaryComment}
            onChange={handleChange}
            cols="30"
            rows="5"
          />
        </FormGroup>
        <Button color="primary" type="submit" disabled={isLoading}>
          Submit
        </Button>
      </Form>
    </>
  );
};
