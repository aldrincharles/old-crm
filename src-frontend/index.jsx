import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "regenerator-runtime/runtime";
import { createRoot } from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import App from "./App";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
