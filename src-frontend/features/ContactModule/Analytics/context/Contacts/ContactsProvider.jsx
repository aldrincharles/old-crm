import React, { createContext, useContext } from "react";
import { useSessionReducer } from "hooks";

import { reducer, initialState } from "./reducer";

const ContactTableContext = createContext(null);
const ContactTableDispatchContext = createContext(null);

const ContactsProvider = ({ name, children }) => {
  const [state, dispatch] = useSessionReducer(reducer, initialState, name);

  return (
    <ContactTableContext.Provider value={state}>
      <ContactTableDispatchContext.Provider value={dispatch}>
        {children}
      </ContactTableDispatchContext.Provider>
    </ContactTableContext.Provider>
  );
};

function useContactTable() {
  return useContext(ContactTableContext);
}

function useContactTableDispatch() {
  return useContext(ContactTableDispatchContext);
}

export { useContactTable, useContactTableDispatch, ContactsProvider };
