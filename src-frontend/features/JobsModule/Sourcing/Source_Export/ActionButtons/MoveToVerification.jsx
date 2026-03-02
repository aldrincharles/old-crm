import React, { useState } from "react";

import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { toast } from "react-toastify";

import { useAxiosPrivate } from "hooks";
import { useNavigate } from "react-router";

export const MoveToVerification = ({ id }) => {
  const navigate = useNavigate();
  const authAxios = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);

  const handleMoveVerification = async () => {
    setIsLoading(true);
    const response = authAxios.post(
      `/jobs/sourcing/move-to-verification/${id}`,
      {
        job_id: id,
      }
    );

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
      navigate(`/jobs/${id}/sourcing/verification`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      outline
      color="primary"
      disabled={isLoading}
      onClick={handleMoveVerification}
    >
      <i className="fas fa-arrow-circle-right" /> Verification
    </Button>
  );
};

MoveToVerification.propTypes = {
  id: PropTypes.string.isRequired,
};
