import React from "react";

import { useFetch } from "hooks";
import { BarLoaderSpinner, ErrorHandler } from "components";
import { ContactCards } from "./ContactCards/ContactCards";
export const Clusters = ({
  title,
  position,
  url,
  country = false,
  minHeight = 25,
}) => {
  const { data, isLoading, errorMessage, refetch } = useFetch({
    initialUrl: url,
    initialParams: { position: position },
  });

  if (errorMessage)
    return <ErrorHandler minHeight={minHeight} onRetry={refetch} />;

  return (
    <div className="my-2">
      <h3 style={{ textAlign: "left" }}>{title}</h3>

      {isLoading && <BarLoaderSpinner />}
      {position === "apac_management" ? (
        <>
          <div className="px-4 pb-4">
            <RenderCard data={data?.vp_head || []} country={country} />
          </div>
          <div className="px-4 pb-4">
            <RenderCard data={data?.vp_sales || []} country={country} />
          </div>
          <div className="px-4 pb-4">
            <RenderCard data={data?.vp_other || []} country={country} />
          </div>
        </>
      ) : (
        <div className="px-4 pb-4">
          <RenderCard data={data || []} country={country} />
        </div>
      )}
    </div>
  );
};

const RenderCard = ({ country, data }) => {
  if (data.length === 0) return null;

  if (country) {
    return (
      <>
        {data.map(({ location, contact }, index) => (
          <div key={index}>
            <h3>{location}</h3>
            <ContactCards data={contact} />
          </div>
        ))}
      </>
    );
  } else return <ContactCards data={data} />;
};
