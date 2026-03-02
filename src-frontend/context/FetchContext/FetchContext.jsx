/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  createContext,
  useRef,
  useMemo,
  useContext,
} from "react";

import { useAxiosPrivate, useLoading } from "hooks";
import { nullChecker } from "utils";
import { FetchFilterContext } from "context/FetchFilter";

import { ErrorHandler } from "common/ServerFetch/ErrorHandler";
import { Pagination } from "common/ServerFetch/Pagination";

const FetchContext = createContext(null);
const { Provider } = FetchContext;

const useFetchContext = (initialUrl) => {
  const [url, updateUrl] = useState(initialUrl);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState(1);

  const fetchContext = useMemo(
    () => ({
      url,
      updateUrl,
      data,
      setData,
      error,
      setError,
      totalCount,
      setTotalCount,
    }),
    [data, error, totalCount, url]
  );

  return fetchContext;
};

const FetchProvider = ({ url: initialUrl, skip = false, children }) => {
  const { state } = useContext(FetchFilterContext);
  const isFirstRun = useRef(skip);
  const authAxios = useAxiosPrivate();
  const {
    url,
    updateUrl,
    data,
    setData,
    error,
    setError,
    totalCount,
    setTotalCount,
  } = useFetchContext(initialUrl);

  const [refetchIndex, setRefetchIndex] = useState(0);

  const getRequestParams = () => {
    const filters = nullChecker(state.search);

    let params = {
      ...filters,
      page: state.page,
      size: state.size,
      direction: state.direction,
      accessor: state.accessor,
    };

    //convert object into a query string format
    const queryString = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");
    return queryString;
  };

  const fetchData = async (signal) => {
    if (url === undefined) return;

    setError("");
    const params = getRequestParams();
    try {
      const response = await authAxios.get(`${url}?${params}`, {
        signal: signal,
      });
      const result = response.data;
      result?.totalCount ? setTotalCount(result.totalCount) : setTotalCount(0);
      result?.content && setData(result.content);
    } catch (error) {
      setError(error.message);
    }
  };

  const [getData, isLoading] = useLoading(fetchData);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;
    getData(signal);

    //cleanup function
    return () => {
      controller.abort();
    };
  }, [url, state, refetchIndex]);

  const refetch = () => {
    setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1);
  };

  const value = {
    updateUrl,

    data,
    setData,
    isLoading,
    error,
    retrieveData: refetch,
    totalCount,
  };

  return <Provider value={value}>{children}</Provider>;
};

FetchProvider.Error = ErrorHandler;
FetchProvider.Pagination = Pagination;
export { FetchProvider, FetchContext };
