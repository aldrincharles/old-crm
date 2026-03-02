/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";

import deepEqual from "fast-deep-equal/es6";

import { usePrevious } from "./usePrevious";

const useSessionReducer = (reducer, initialState, storageKey) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const prevState = usePrevious(state);

  function init() {
    const stringState = sessionStorage.getItem(storageKey);
    if (stringState) {
      try {
        return JSON.parse(stringState);
      } catch (error) {
        return initialState;
      }
    } else {
      return initialState;
    }
  }

  useEffect(() => {
    const stateEqual = deepEqual(prevState, state);
    if (!stateEqual) {
      const stringifiedState = JSON.stringify(state);
      sessionStorage.setItem(storageKey, stringifiedState);
    }
  }, [state]);

  return [state, dispatch];
};

export { useSessionReducer };
