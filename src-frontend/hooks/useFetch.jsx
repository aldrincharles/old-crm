import { useState, useEffect, useCallback } from "react";

import { useAxiosPrivate } from "./useAxiosPrivate";
import { nullChecker, trueTypeOf } from "utils";

export const useFetch = ({
  initialUrl = undefined,
  initialParams = undefined,
}) => {
  const authAxios = useAxiosPrivate();
  const [url, updateUrl] = useState(initialUrl);
  const [params, setParams] = useState(initialParams);

  const [data, setData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [refetchIndex, setRefetchIndex] = useState(0);

  const getRequestParams = (object) => {
    if (trueTypeOf(object) === "undefined") return "";

    let search = object.search ? object.search : object;
    const filters = nullChecker(search);

    let param = {
      ...filters,
      page: object.page,
      size: object.size,
      direction: object.direction,
      accessor: object.accessor,
    };

    //convert object into a query string format
    const queryString = Object.keys(param)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(param[key])
      )
      .join("&");
    return queryString;
  };

  useEffect(() => {
    if (url === undefined) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setErrorMessage("");
      setLoading(true);
      let sanitizedQuery = getRequestParams(params);
      try {
        const response = await authAxios.get(`${url}?${sanitizedQuery}`, {
          signal: signal,
        });
        const result = response.data;
        result?.content && setData(result.content);
        result?.totalCount
          ? setTotalCount(result.totalCount)
          : setTotalCount(0);
      } catch (error) {
        setErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    //cleanup function
    return () => {
      controller.abort();
    };
  }, [url, params, refetchIndex, initialUrl, authAxios]);

  const updateParams = useCallback((value) => {
    setParams(value);
  }, []);

  const refetch = () => {
    setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1);
  };

  return {
    data,
    setData,
    isLoading,
    errorMessage,
    totalCount,

    updateUrl,
    updateParams,
    refetch,
  };
};
