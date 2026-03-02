import React from "react";

import { Tooltip } from "reactstrap";
import { useToggle } from "hooks";

export const HoverTooltip = ({ children, hoverText, placement, id }) => {
  const [visible, toggle] = useToggle();

  return (
    <>
      <div id={"TooltipTarget" + id}>{children}</div>
      {hoverText && (
        <Tooltip
          placement={placement}
          isOpen={visible}
          target={"TooltipTarget" + id}
          toggle={toggle}
        >
          {hoverText}
        </Tooltip>
      )}
    </>
  );
};
