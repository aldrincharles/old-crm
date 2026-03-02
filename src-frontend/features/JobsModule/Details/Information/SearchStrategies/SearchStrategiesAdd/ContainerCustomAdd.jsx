import React, { useContext, useState } from "react";

import { useParams } from "react-router";
import { toast } from "react-toastify";

import { useAxiosPrivate, useMultistepForm } from "hooks";

import { BasicInfoForm } from "./form/BasicInfoForm";
import { CriteriaForm } from "./form/CriteriaForm";
import { SearchStrategiesContext } from "../context/SearchStrategiesContext";
import { Button, Card, CardBody, Form } from "reactstrap";

const ContainerCustomAdd = ({ toggle }) => {
  const authAxios = useAxiosPrivate();
  const { id } = useParams();
  const [criteria, setCriteria] = useState([{ inputType: "" }]);
  const [info, setInfo] = useState({});
  const { refetch } = useContext(SearchStrategiesContext);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <BasicInfoForm info={info} setInfo={setInfo} />,
      <CriteriaForm criteria={criteria} setCriteria={setCriteria} />,
    ]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!isLastStep) return next();

    const response = authAxios.post(
      `/jobs/${id}/details/information/search-strategy/custom`,
      {
        info,
        criteria,
      }
    );

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

    toggle();
    refetch();
  };

  return (
    <>
      <Form id="SearchStratCustomForm" onSubmit={onSubmit}>
        <Card>
          <CardBody>
            <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
              {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
          </CardBody>
        </Card>
      </Form>

      <div className="mt-2 d-flex justify-content-end">
        {!isFirstStep && (
          <Button
            className="me-2"
            color="primary"
            outline
            type="button"
            onClick={back}
          >
            Back
          </Button>
        )}
        <Button color="success" form="SearchStratCustomForm" type="submit">
          {isLastStep ? "Finish" : "Next"}
        </Button>
      </div>
    </>
  );
};

export { ContainerCustomAdd };
