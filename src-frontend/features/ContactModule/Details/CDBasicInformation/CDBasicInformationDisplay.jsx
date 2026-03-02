import { Skeleton } from "components";
import React from "react";

import { Badge } from "reactstrap";

import { dateFormatter } from "utils";

export const CDBasicInformationDisplay = ({ data, isLoading = true }) => {
  const contents = [
    {
      name: "Position Time Frame",
      content: data?.position_time_frame
        ? dateFormatter(data.position_time_frame, {
            month: "long",
            year: "numeric",
          })
        : null,
    },
    {
      name: "Company Time Frame",
      content: data?.company_time_frame
        ? dateFormatter(data.company_time_frame, {
            month: "long",
            year: "numeric",
          })
        : null,
    },
    {
      name: "Linkedin",
      content: (
        <a href={data?.linkedin} target="_blank" rel="noreferrer">
          {data?.linkedin}
        </a>
      ),
    },
    {
      name: "Position",
      content: data?.position.label,
    },
    {
      name: "Industry",
      content: data?.industry.label,
    },
    {
      name: "Vertical",
      content: data?.vertical.label,
    },
    {
      name: "Seniority",
      content: data?.seniority.label,
    },
    {
      name: "Sales Profile",
      content: data?.sales_profile,
    },
    {
      name: "Location",
      content: data?.location.label,
    },
    {
      name: "Geography",
      content: data?.geography.label,
    },
    {
      name: "Gender",
      content: data?.gender,
    },
    {
      name: "Age",
      content: data?.age,
    },
    {
      name: "School Graduated",
      content: data?.school_graduated,
    },
    {
      name: "School Ranking",
      content: data?.school_ranking,
    },
    {
      name: "Year Graduated",
      content: data?.year_graduated,
    },
    {
      name: "Personal Email",
      content: data?.personal_email,
    },
    {
      name: "Work Email",
      content: data?.work_email,
    },
    {
      name: "Mobile",
      content: data?.mobile,
    },
    {
      name: "Candidate Category",
      content: data?.candidate_category,
    },
    {
      name: "Internal Grading",
      content: data?.internal_grading,
    },
    {
      name: "Status",
      content: data?.status.label,
    },
    {
      name: "Nationality",
      content: data?.nationality.label,
    },
    {
      name: "Source",
      content: data?.source,
    },
  ];

  return (
    <>
      {contents.map((c) => (
        <p
          key={c.name}
          className={isLoading ? null : "contact-item border-bottom"}
        >
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <span className="fw-bold">{c.name}: </span>
              <span>{c.content}</span>
            </>
          )}
        </p>
      ))}

      <div className="card card-recent-messages mg-t-10">
        <div className="card-header">
          <span>Language</span>
        </div>
        {isLoading ? (
          <Skeleton count={2} />
        ) : (
          <div className="list-group list-group-flush">
            <div className="list-group-item">
              {data &&
                data.languages.map((data, i) => (
                  <Badge key={i} className="me-2" color="info">
                    {data.value}
                  </Badge>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="card card-recent-messages mg-t-10 my-3">
        <div className="card-header">
          <span>Sales Specialization</span>
        </div>
        {isLoading ? (
          <Skeleton count={2} />
        ) : (
          <div className="list-group list-group-flush">
            <div className="list-group-item">
              {data &&
                data.sales_specializations.map((data, i) => (
                  <Badge key={i} className="me-2" color="info">
                    {data.value}
                  </Badge>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="card card-recent-messages mg-t-10">
        <div className="card-header">
          <span>Dev Specialization</span>
        </div>
        {isLoading ? (
          <Skeleton count={2} />
        ) : (
          <div className="list-group list-group-flush">
            <div className="list-group-item">
              {data &&
                data.dev_specializations.map((data, i) => (
                  <Badge key={i} className="me-2" color="info">
                    {data.value}
                  </Badge>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-5" style={{ textAlign: "left" }}>
        <p>
          <small>Last updated: {data?.last_updated}</small>
        </p>
        <p>
          <small>Date Added: {data?.date_added}</small>
        </p>
      </div>
    </>
  );
};
