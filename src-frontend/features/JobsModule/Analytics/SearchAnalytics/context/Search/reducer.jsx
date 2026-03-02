import { ActionType } from "./actions";

export const initialState = {
  search: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.PAGE_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }

    case ActionType.PAGE_SEARCH_RESET: {
      return {
        ...state,
        search: initialState.search,
      };
    }

    default:
      return state;
  }
};
