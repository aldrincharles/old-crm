import React from "react";

import { useParams } from "react-router";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { BoardMembersDisplay } from "./BoardMembersDisplay";

export const BoardMembersMain = () => {
  const { id } = useParams();
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/organization/people/${id}/board-members`,
  });

  if (errorMessage) return <ErrorHandler minHeight={25} onRetry={refetch} />;

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <h3>Board Affiliation</h3>
      </div>

      {isLoading && <BarLoaderSpinner />}
      <BoardMembersDisplay data={data} />
    </>
  );
};
