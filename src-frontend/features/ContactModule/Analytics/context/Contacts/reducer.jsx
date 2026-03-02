import { ActionType } from "./actions";

export const initialState = {
  page: 1,
  size: 10,
  direction: "none",
  accessor: "",
};

export const reducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};
