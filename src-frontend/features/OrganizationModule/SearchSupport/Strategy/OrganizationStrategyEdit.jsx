import React, { useState } from "react";

import { Button, Card, CardBody, Form } from "reactstrap";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import { useAxiosPrivate, useMultistepForm, useToggle } from "hooks";
import { BootstrapModal } from "components";

import { CriteriaForm } from "./form/CriteriaForm";
import { BasicInfoForm } from "./form/BasicInfoForm";

const OrganizationStrategyEdit = ({ rowID, info, criteria, onEdit }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <Button color="primary" onClick={toggle}>
        <i className="ion-edit" />
      </Button>
      <ComponentDialogue
        data={{
          rowID: rowID,
          initialInfo: info || {},
          initialCriteria: criteria || [],
        }}
        onEdit={onEdit}
        visible={visible}
        toggle={toggle}
      />
    </>
  );
};

const ComponentDialogue = React.memo(
  ({
    data: { rowID, initialInfo, initialCriteria },
    onEdit,
    visible,
    toggle,
  }) => {
    const { id } = useParams();
    const authAxios = useAxiosPrivate();

    const [criteria, setCriteria] = useState(initialCriteria);
    const [info, setInfo] = useState(initialInfo);

    const {
      steps,
      currentStepIndex,
      step,
      isFirstStep,
      isLastStep,
      back,
      next,
      goTo,
    } = useMultistepForm([
      <BasicInfoForm info={info} setInfo={setInfo} />,
      <CriteriaForm criteria={criteria} setCriteria={setCriteria} />,
    ]);

    const onSubmit = async (event) => {
      event.preventDefault();
      if (!isLastStep) return next();

      const response = authAxios.put(`organization/${id}/strategy`, {
        id: rowID,
        info,
        criteria,
      });

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

      goTo(0);
      toggle();
      onEdit();
    };

    return (
      <>
        <BootstrapModal size="lg" isOpen={visible} toggle={toggle}>
          <BootstrapModal.Header>Edit Strategy</BootstrapModal.Header>
          <BootstrapModal.Body>
            <Form id="OrgStrategyAdd" onSubmit={onSubmit}>
              <Card>
                <CardBody>
                  <div
                    style={{
                      position: "absolute",
                      top: ".5rem",
                      right: ".5rem",
                    }}
                  >
                    {currentStepIndex + 1} / {steps.length}
                  </div>
                  {step}
                </CardBody>
              </Card>
            </Form>
            {/* <pre>
            {JSON.stringify(
              {
                info,
                criteria,
              },
              null,
              2
            )}
          </pre> */}
          </BootstrapModal.Body>
          <BootstrapModal.Footer toggle={toggle}>
            {!isFirstStep && (
              <Button
                color="primary"
                className="me-2"
                outline
                type="button"
                onClick={back}
              >
                Back
              </Button>
            )}
            <Button color="success" form="OrgStrategyAdd" type="submit">
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </BootstrapModal.Footer>
        </BootstrapModal>
      </>
    );
  }
);

export { OrganizationStrategyEdit };
