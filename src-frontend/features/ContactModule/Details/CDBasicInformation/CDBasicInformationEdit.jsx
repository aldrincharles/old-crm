import React, { useState } from "react";

import { Button, Form } from "reactstrap";
import { toast } from "react-toastify";

import { BootstrapModal } from "components";
import { useToggle, useCustomForm, useAxiosPrivate } from "hooks";
import { ContactBasicInformationForm } from "common";

export const CDBasicInformationEdit = ({
  data,
  id,
  onRefetch = () => null,
}) => {
  const initialState = {
    name: data?.name || "",
    gender: data?.gender || "",
    school_graduated: data?.school_graduated || "",
    school_ranking: data?.school_ranking || "",
    year_graduated: data?.year_graduated || "",
    organization: data?.organization || "",
    industry: data?.industry || "",
    vertical: data?.vertical || "",
    linkedin: data?.linkedin || "",
    job_title: data?.job_title || "",
    seniority: data?.seniority || "",
    position: data?.position || "",
    position_time_frame: data?.position_time_frame
      ? new Date(data?.position_time_frame)
      : new Date(),
    company_time_frame: data?.company_time_frame
      ? new Date(data?.company_time_frame)
      : new Date(),
    personal_email: data?.personal_email || "",
    work_email: data?.work_email || "",
    mobile: data?.mobile || "",
    location: data?.location || "",
    geography: data?.geography || "",
    candidate_category: data?.candidate_category || "",
    internal_grading: data?.internal_grading || "",
    status: data?.status || "",
    nationality: data?.nationality || "",
    languages: data?.languages,
    sales_specializations: data?.sales_specializations,
    dev_specializations: data?.dev_specializations,
    source: data?.source || "",
    sales_profile: data?.sales_profile || "",
  };
  const authAxios = useAxiosPrivate();
  const { formData, handleOnChange, handleSubmit } = useCustomForm(
    initialState,
    (e) => onSubmit(e)
  );

  const [visible, toggle] = useToggle();
  const [buttonState, setButtonState] = useState(true);

  const onSubmit = async (data) => {
    setButtonState(false);
    try {
      let response = authAxios.put(`/contact/${id}/basic-information`, {
        ...data,
      });
      response = await toast.promise(response, {
        pending: "Pending",
        success: {
          render({ data }) {
            const message = data.data?.message;
            return `${message} 👌`;
          },
        },
        error: "Oops! Something went wrong 🤯",
      });
      const result = response.data;
      toggle();
      onRefetch(result.content);
    } catch (error) {
    } finally {
      setButtonState(true);
    }
  };

  return (
    <>
      <Button size="lg" color="primary" onClick={toggle}>
        <i className="ion-edit" />
      </Button>
      <BootstrapModal isOpen={visible} toggle={toggle} size="xl">
        <BootstrapModal.Body>
          <Form id="BasicInformationEdit" onSubmit={handleSubmit}>
            <ContactBasicInformationForm
              formData={formData}
              handleOnChange={handleOnChange}
            />
          </Form>
          {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        </BootstrapModal.Body>
        <BootstrapModal.Footer toggle={toggle}>
          <Button
            disabled={!buttonState}
            type="submit"
            form="BasicInformationEdit"
            color="success"
          >
            {buttonState ? <div>SUBMIT</div> : <div>Processing...</div>}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};
