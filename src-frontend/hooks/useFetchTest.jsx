/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect, useState } from "react";

import { nullChecker, trueTypeOf } from "utils";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useMountedState } from "./useMountedState";

const useFetchReducer = (state, action) => {
  switch (action.type) {
    case "BEGIN":
      return {
        ...state,
        isLoading: true,
        error: "",
      };

    case "SUCCESS": {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    }
    case "FAILED": {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export const useFetchTest = ({
  initialUrl = "",
  initialParams = undefined,
}) => {
  const mountedRef = useMountedState();
  const authAxios = useAxiosPrivate();
  const [state, dispatch] = useReducer(useFetchReducer, {
    data: null,
    isLoading: true,
    error: "",
  });
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    startTask(controller.signal);

    //cleanup function
    return () => {
      controller.abort();
    };
  }, [initialUrl, initialParams, refetchIndex]);

  const startTask = async (signal) => {
    dispatch({ type: "BEGIN" });
    const sanitizedQuery = getRequestParams(initialParams);
    try {
      const response = await authAxios.post(`${initialUrl}?${sanitizedQuery}`, {
        signal: signal,
      });
      const taskID = response.data.task_id;
      getStatus(taskID, signal);
    } catch (error) {
      dispatch({ type: "FAILED", payload: error });
    }
  };

  const getStatus = async (taskID, signal) => {
    try {
      const response = await authAxios.get(`${initialUrl}/${taskID}`, {
        signal: signal,
      });
      const status = response.data.status_state;
      const result = response.data;

      if (status === "SUCCESS") {
        dispatch({ type: "SUCCESS", payload: result.content });
      } else if (status === "PENDING" && mountedRef()) {
        setTimeout(function () {
          getStatus(taskID);
        }, 2000);
      }
    } catch (error) {
      dispatch({ type: "FAILED", payload: error });
    }
  };

  const refetch = () => {
    setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1);
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    refetch,
  };
};

const getRequestParams = (search) => {
  if (trueTypeOf(search) === "undefined") return "";
  const filters = nullChecker(search);

  //convert object into a query string format
  const queryString = Object.keys(filters)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(filters[key])
    )
    .join("&");
  return queryString;
};
