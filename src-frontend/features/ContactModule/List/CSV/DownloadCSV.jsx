import React, { useContext, useEffect, useRef, useState } from "react";

import { CSVLink } from "react-csv";
import { Button } from "reactstrap";
import { toast } from "react-toastify";

import { useAxiosPrivate, useMountedState } from "hooks";
import { FetchFilterContext } from "context/FetchFilter";
import { nullChecker } from "utils";

const DownloadCSV = () => {
  const { state } = useContext(FetchFilterContext);

  const [csv, setCSV] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mountedRef = useMountedState();
  const authAxios = useAxiosPrivate();
  const csvInstance = useRef();

  useEffect(() => {
    if (csv && csvInstance.current && csvInstance.current.link) {
      setTimeout(() => {
        csvInstance.current.link.click();
        setCSV(false);
      });
    }
  }, [csv]);

  const onClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const currentToaster = toast.loading("Please wait...");

    const params = getRequestParams(state);

    const response = await authAxios.post(`/contact/export-to-csv?${params}`);
    const taskID = response.data.task_id;
    getStatus(taskID, currentToaster);
  };

  const getStatus = async (taskID, currentToaster) => {
    try {
      const response = await authAxios.get(`/contact/export-to-csv/${taskID}`);
      const status = response.data.status_state;
      const data = response.data.content;

      if (status === "SUCCESS") {
        toast.update(currentToaster, {
          render: "Advance Export success 👌",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          progress: 0,
        });
        setCSV({
          data: data.row,
          headers: data.headers,
        });

        setIsLoading(false);
      } else if (
        (status === "PENDING" || status === "PROGRESS") &&
        mountedRef()
      ) {
        toast.update(currentToaster, {
          render: (
            <>
              <div>{Math.round(data.progress * 100)}% Please wait...</div>
            </>
          ),
          type: "default",
          isLoading: true,
          progress: data.progress,
        });

        setTimeout(function () {
          getStatus(taskID, currentToaster);
        }, 2000);
      }
    } catch (error) {
      toast.update(currentToaster, {
        render: "Oops! Something went wrong 🤯",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        progress: 0,
      });
      setIsLoading(false);
    }
  };

  const getRequestParams = (state) => {
    const filters = nullChecker(state.search);

    let params = {
      ...filters,
    };

    //convert object into a query string format
    const queryString = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");
    return queryString;
  };

  return (
    <>
      <Button color="primary" disabled={isLoading} onClick={onClick}>
        <i className="fas fa-angle-double-down"></i> CSV
      </Button>
      {csv ? (
        <CSVLink
          data={csv.data}
          headers={csv.headers}
          filename="contact_list.csv"
          ref={csvInstance}
        />
      ) : null}
    </>
  );
};

export { DownloadCSV };
