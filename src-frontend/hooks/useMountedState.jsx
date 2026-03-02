import { useCallback, useEffect, useRef } from "react";

const useMountedState = () => {
  const mountedRef = useRef(false);
  const getState = useCallback(() => {
    return mountedRef.current;
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return getState;
};
export { useMountedState };
