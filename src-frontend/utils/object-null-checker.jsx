import { PropTypes } from "prop-types";
import { trueTypeOf } from "./true-data-type";

export const nullChecker = (state) => {
  const obj = {};

  for (const key in state) {
    switch (trueTypeOf(state[key])) {
      case "array":
        const arr = [];
        state[key].map((e) => arr.push(e.value));
        if (arr.length > 0) obj[key] = arr;
        continue;
      case "object":
        obj[key] = state[key]["value"];
        continue;
      case "number":
      case "string":
      case "boolean":
      case "date":
        obj[key] = state[key];
        continue;
      default:
        break;
    }
  }

  return obj;
};

nullChecker.propTypes = {
  state: PropTypes.object,
};
