import React, { useEffect, useState } from "react";

import { BarLoader } from "react-spinners";

const delay = 750;

const BarLoaderSpinner = React.memo(() => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), delay);
    return () => clearTimeout(timer);
  });

  return (
    showSpinner && (
      <BarLoader
        color="#0f264a"
        height={4}
        speedMultiplier={1}
        cssOverride={{
          position: "relative",
          width: "100%",
        }}
      />
    )
  );
});

export { BarLoaderSpinner };
