import React, { createContext, useMemo } from "react";
import { useSessionReducer } from "hooks";

import { fetchReducer, initialState } from "context/FetchFilter/reducer";

const FetchFilterContext = createContext(null);
const { Provider } = FetchFilterContext;

const useFetchFilterContext = (name) => {
  const [state, dispatch] = useSessionReducer(fetchReducer, initialState, name);

  const fetchFilter = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [dispatch, state]
  );

  return fetchFilter;
};

const FetchFilterProvider = ({ name, children }) => {
  const fetchFilter = useFetchFilterContext(name);
  return <Provider value={fetchFilter}>{children}</Provider>;
};

export { FetchFilterContext, FetchFilterProvider };
