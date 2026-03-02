import { useState, useEffect } from "react";

export const useSessionState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const persistedState = sessionStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};
