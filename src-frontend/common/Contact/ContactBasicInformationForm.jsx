import React from "react";

import PropTypes from "prop-types";
import { FormGroup, Input, Label } from "reactstrap";

import { Conditional, CustomDatePicker, AsyncSelectWrap } from "components";
import {
  gender,
  candidateCategory,
  internalGrading,
  sourceOptions,
  schoolRankings,
  salesProfileOptions,
} from "constants";

export const ContactBasicInformationForm = ({
  message = "",
  formData = {},
  handleOnChange = () => null,
  handleOnBlur = () => null,
}) => {
  const componentID = "ContactBasicInformation";

  return (
    <>
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          maxLength={40}
          value={formData.name}
          onChange={(e) => {
            handleOnChange("name", e.target.value);
          }}
          onBlur={(e) => {
            handleOnBlur(e.target.value);
          }}
          placeholder="Write Name Here..."
          required
        />
        {message && (
          <>
            <Conditional if={message.trim() !== ""}>
              <span className="text-danger">&#9940; {message}</span>
            </Conditional>

            <Conditional if={message.trim() === "" && formData.name !== ""}>
              <span className="text-success">&#9989; Please proceed...</span>
            </Conditional>
          </>
        )}
      </FormGroup>
      <FormGroup>
        <Label>Gender</Label>
        <Input
          id={`${componentID} gender`}
          name="gender"
          type="select"
          value={formData.gender}
          onChange={(e) => {
            handleOnChange("gender", e.target.value);
          }}
          required
        >
          <option value="">Select</option>
          {gender.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>School Graduated</Label>
        <Input
          type="text"
          name="school_graduated"
          maxLength={1000}
          value={formData.school_graduated}
          onChange={(e) => {
            handleOnChange("school_graduated", e.target.value);
          }}
          placeholder="Write Name of School Here..."
        />
      </FormGroup>
      <FormGroup>
        <Label>School Ranking</Label>
        <Input
          id={`${componentID} school_ranking`}
          name="school_ranking"
          type="select"
          value={formData.school_ranking}
          onChange={(e) => {
            handleOnChange("school_ranking", e.target.value);
          }}
        >
          <option value="">Choose One</option>
          {schoolRankings.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Year Graduated</Label>
        <Input
          type="number"
          min={1970}
          max={9999}
          value={formData.year_graduated}
          onChange={(e) => {
            handleOnChange("year_graduated", e.target.value);
          }}
          placeholder="1970"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Organization</Label>
        <AsyncSelectWrap
          name="organization"
          dependencies={{ url: "/parameters", topic: "organization" }}
          value={formData.organization}
          onChange={(e) => handleOnChange("organization", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Industry</Label>
        <AsyncSelectWrap
          name="industry"
          dependencies={{ url: "/parameters", topic: "industry" }}
          value={formData.industry}
          onChange={(e) => handleOnChange("industry", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Vertical</Label>
        <AsyncSelectWrap
          name="vertical"
          dependencies={{ url: "/parameters", topic: "vertical" }}
          value={formData.vertical}
          onChange={(e) => handleOnChange("vertical", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>LinkedIn URL</Label>
        <Input
          type="text"
          name="linkedin"
          maxLength={100}
          value={formData.linkedin}
          onChange={(e) => {
            handleOnChange("linkedin", e.target.value);
          }}
          placeholder="Write LinkedIn URL Here..."
          required
        />
      </FormGroup>
      <Label>Job Title</Label>
      <Input
        type="text"
        name="job_title"
        maxLength={1000}
        value={formData.job_title}
        onChange={(e) => {
          handleOnChange("job_title", e.target.value);
        }}
        placeholder="Write Job Title Here..."
        required
      />
      <FormGroup>
        <Label>Position</Label>
        <AsyncSelectWrap
          name="position"
          dependencies={{ url: "/parameters", topic: "position" }}
          value={formData.position}
          onChange={(e) => handleOnChange("position", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Seniority</Label>
        <AsyncSelectWrap
          name="seniority"
          dependencies={{ url: "/parameters", topic: "seniority" }}
          value={formData.seniority}
          onChange={(e) => handleOnChange("seniority", e)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Current Company Time Frame</Label>
        <CustomDatePicker
          selected={formData.company_time_frame}
          onChange={(e) => handleOnChange("company_time_frame", e)}
          dateFormat="MMMM yyyy"
        />
      </FormGroup>
      <FormGroup>
        <Label>Current Position Time Frame</Label>
        <CustomDatePicker
          selected={formData.position_time_frame}
          onChange={(e) => handleOnChange("position_time_frame", e)}
          dateFormat="MMMM yyyy"
        />
      </FormGroup>
      <FormGroup>
        <Label>Sales Profile</Label>
        <Input
          id={`${componentID} sales_profile`}
          name="sales_profile"
          type="select"
          value={formData.sales_profile}
          onChange={(e) => {
            handleOnChange("sales_profile", e.target.value);
          }}
        >
          <option value="">Choose One</option>
          {salesProfileOptions.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Personal E-Mail</Label>
        <Input
          type="email"
          name="personal_email"
          maxLength={40}
          value={formData.personal_email}
          onChange={(e) => {
            handleOnChange("personal_email", e.target.value);
          }}
          placeholder="mark_kearney@mail.com"
        />
      </FormGroup>
      <FormGroup>
        <Label>Company E-Mail</Label>
        <Input
          type="text"
          name="email"
          maxLength={40}
          value={formData.work_email}
          onChange={(e) => {
            handleOnChange("work_email", e.target.value);
          }}
          placeholder="mark_kearney@mail.com"
        />
      </FormGroup>
      <FormGroup>
        <Label>Mobile Number</Label>
        <Input
          type="text"
          maxLength={40}
          value={formData.mobile}
          onChange={(e) => {
            handleOnChange("mobile", e.target.value);
          }}
          placeholder="Write Mobile Number Here..."
        />
      </FormGroup>
      <FormGroup>
        <Label>Location</Label>
        <AsyncSelectWrap
          name="location"
          dependencies={{ url: "/parameters", topic: "location" }}
          value={formData.location}
          onChange={(e) => handleOnChange("location", e)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Geography</Label>
        <AsyncSelectWrap
          name="geography"
          dependencies={{ url: "/parameters", topic: "geography" }}
          value={formData.geography}
          onChange={(e) => handleOnChange("geography", e)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Source</Label>
        <Input
          id={`${componentID} source`}
          name="source"
          type="select"
          value={formData.source}
          onChange={(e) => {
            handleOnChange("source", e.target.value);
          }}
        >
          <option value="">Choose One</option>
          {sourceOptions.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Candidate Category</Label>
        <Input
          id={`${componentID} candidate_category`}
          name="candidate_category"
          type="select"
          value={formData.candidate_category}
          onChange={(e) => {
            handleOnChange("candidate_category", e.target.value);
          }}
        >
          <option value="">Choose One</option>
          {candidateCategory.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Internal Grading</Label>
        <Input
          id={`${componentID} internal_grading`}
          name="internal_grading"
          type="select"
          value={formData.internal_grading}
          onChange={(e) => {
            handleOnChange("internal_grading", e.target.value);
          }}
        >
          <option value="">Choose One</option>
          {internalGrading.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>ID Status</Label>
        <AsyncSelectWrap
          name="status"
          dependencies={{ url: "/parameters", topic: "citizenship" }}
          value={formData.status}
          onChange={(e) => handleOnChange("status", e)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Languages</Label>
        <AsyncSelectWrap
          name="languages"
          dependencies={{ url: "/parameters", topic: "languages" }}
          value={formData.languages}
          onChange={(e) => handleOnChange("languages", e)}
          placeholder="Select Languages"
          isMulti
          isClearable
        />
      </FormGroup>
      <FormGroup>
        <Label>Nationality</Label>
        <AsyncSelectWrap
          name="nationality"
          dependencies={{ url: "/parameters", topic: "nationality" }}
          value={formData.nationality}
          onChange={(e) => handleOnChange("nationality", e)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Sales Specialization</Label>
        <AsyncSelectWrap
          name="sales_specializations"
          dependencies={{ url: "/parameters", topic: "sales_specializations" }}
          value={formData.sales_specializations}
          onChange={(e) => handleOnChange("sales_specializations", e)}
          placeholder="Select Sales Specialization"
          isMulti
          isClearable
        />
      </FormGroup>

      <FormGroup>
        <Label>Dev Specialization</Label>
        <AsyncSelectWrap
          name="dev_specializations"
          dependencies={{
            url: "/parameters",
            topic: "developer_specializations",
          }}
          value={formData.dev_specializations}
          onChange={(e) => handleOnChange("dev_specializations", e)}
          placeholder="Select Dev Specialization"
          isMulti
          isClearable
        />
      </FormGroup>
    </>
  );
};

ContactBasicInformationForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  message: PropTypes.string,
  handleOnBlur: PropTypes.func,
};
