import { ActionType } from "./actions";

export const initialState = {
  page: 1,
  size: 10,
  direction: "none",
  accessor: "",
  search: {},
};

export const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.PAGE_NEXT:
      return {
        ...state,
        page: action.payload,
      };

    case ActionType.PAGE_SIZE: {
      return {
        ...state,
        page: initialState.page,
        size: action.payload,
      };
    }

    case ActionType.PAGE_SORT: {
      return {
        ...state,
        direction: action.payload.direction,
        accessor: action.payload.accessor,
      };
    }

    case ActionType.PAGE_SEARCH: {
      return {
        ...state,
        page: initialState.page,
        search: action.payload,
      };
    }

    case ActionType.PAGE_SEARCH_RESET: {
      return {
        ...state,
        page: initialState.page,
        search: initialState.search,
      };
    }

    default:
      return state;
  }
};
