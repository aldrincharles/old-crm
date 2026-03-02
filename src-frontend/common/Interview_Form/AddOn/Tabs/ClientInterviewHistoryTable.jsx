import React from "react";
import { Table } from "reactstrap";

export const ClientInterviewHistoryTable = ({ data }) => {
  const renderRows = (item, index) => {
    return (
      <tr key={index}>
        <td>{item.stage}</td>
        <td>{item.date}</td>
        <td>{item.time}</td>
        <td>{item.timezone}</td>
        <td>{item.location}</td>
        <td>{item.interviewer}</td>
      </tr>
    );
  };

  return (
    <>
      <div className="mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="align-middle">Stage</th>
              <th className="align-middle">Date</th>
              <th className="align-middle">Time</th>
              <th className="align-middle">Timezone</th>
              <th className="align-middle">Location</th>
              <th className="align-middle">Interviewer</th>
            </tr>
          </thead>
          {data?.history?.length > 0 ? (
            <tbody>{data.history.map(renderRows)}</tbody>
          ) : null}
        </Table>
      </div>
    </>
  );
};
