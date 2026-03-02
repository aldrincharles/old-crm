import { useCallback, useState } from "react";

const useToggle = (isToggle = false) => {
  const [visible, setVisible] = useState(isToggle);

  const toggle = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return [visible, toggle];
};

export { useToggle };
