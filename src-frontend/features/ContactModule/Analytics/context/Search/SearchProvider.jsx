import React, { createContext, useContext } from "react";
import { useSessionReducer } from "hooks";

import { reducer, initialState } from "./reducer";

const SearchContext = createContext(null);
const SearchDispatchContext = createContext(null);

const SearchProvider = ({ name, children }) => {
  const [state, dispatch] = useSessionReducer(reducer, initialState, name);
  return (
    <SearchContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

function useSearchContext() {
  return useContext(SearchContext);
}

function useSearchDispatchContext() {
  return useContext(SearchDispatchContext);
}

export { useSearchContext, useSearchDispatchContext, SearchProvider };
