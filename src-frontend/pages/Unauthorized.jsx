import React from "react";

import { useNavigate } from "react-router-dom";

import { PageTitle } from "components";

const Unauthorized = () => {
  let navigate = useNavigate();
  return (
    <>
      <PageTitle title={`Unauthorized`} />
      <section>
        <h1>Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <div>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </section>
    </>
  );
};

export default Unauthorized;
