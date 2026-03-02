import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { default as SkeletonComponent } from "react-loading-skeleton";

const delay = 750;

const Skeleton = React.memo(({ count, circle, style }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), delay);
    return () => clearTimeout(timer);
  });

  return (
    showSpinner && (
      <SkeletonComponent count={count} circle={circle} style={style} />
    )
  );
});

Skeleton.propTypes = {
  count: PropTypes.number,
  circle: PropTypes.bool,
};

export { Skeleton };
