import React from "react";

import { useAxiosPrivate, useFetch } from "hooks";

import { ErrorHandler } from "components";

import { OrganizationStrategyAdd } from "./OrganizationStrategyAdd";
import { OrganizationStrategyDisplay } from "./OrganizationStrategyDisplay";
import { toast } from "react-toastify";

const OrganizationStrategyMain = ({ id }) => {
  const authAxios = useAxiosPrivate();

  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: `/organization/${id}/strategy`,
  });

  const onDelete = async (rowID) => {
    const response = authAxios.delete(`/organization/${id}/strategy`, {
      data: { id: rowID },
    });
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
    refetch();
  };

  if (errorMessage) return <ErrorHandler onRetry={refetch} />;

  return (
    <>
      <h3 style={{ textAlign: "left" }}>Organization Search Strategy</h3>

      <div style={{ textAlign: "right" }}>
        <OrganizationStrategyAdd onAdd={refetch} />
      </div>

      <OrganizationStrategyDisplay
        data={data || []}
        isLoading={isLoading}
        onEdit={refetch}
        onDelete={onDelete}
      />
    </>
  );
};

export { OrganizationStrategyMain };
