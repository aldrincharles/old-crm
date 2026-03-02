/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { FetchProvider } from "context/FetchContext";
import { FetchFilterProvider } from "context/FetchFilter";

import { JSMasterlistSelector } from "./JSMasterlistSelector";
import { JSMasterlistFilter } from "./JSMasterlistFilter";
import { JSMasterlistDisplay } from "./JSMasterlistDisplay";

const JSMasterlistMain = ({ index }) => {
  const { id } = useParams();
  const [masterlist_id, setMasterlist_id] = useState("");

  return (
    <FetchFilterProvider name={`jobs_masterlist_${id}_${index}`}>
      <FetchProvider skip>
        <JSMasterlistSelector setMasterlist_id={setMasterlist_id} />
        {masterlist_id && (
          <>
            <JSMasterlistFilter />
            <JSMasterlistDisplay />
            <FetchProvider.Pagination />
          </>
        )}
      </FetchProvider>
    </FetchFilterProvider>
  );
};

JSMasterlistMain.propTypes = {
  parameters: PropTypes.array,
};

export default JSMasterlistMain;
