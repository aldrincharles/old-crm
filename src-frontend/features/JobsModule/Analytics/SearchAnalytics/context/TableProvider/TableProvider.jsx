import React, { createContext, useContext } from "react";
import { useSessionReducer } from "hooks";

import { reducer, initialState } from "./reducer";

const TableContext = createContext(null);
const TableDispatchContext = createContext(null);

const TableProvider = ({ name, children }) => {
  const [state, dispatch] = useSessionReducer(reducer, initialState, name);

  return (
    <TableContext.Provider value={state}>
      <TableDispatchContext.Provider value={dispatch}>
        {children}
      </TableDispatchContext.Provider>
    </TableContext.Provider>
  );
};

function useTable() {
  return useContext(TableContext);
}

function useTableDispatch() {
  return useContext(TableDispatchContext);
}

export { useTable, useTableDispatch, TableProvider };
