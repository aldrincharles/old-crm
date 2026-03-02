import keyMirror from "keymirror";

export const ActionType = keyMirror({
  PAGE_NEXT: "PAGE_NEXT",
  PAGE_SIZE: "PAGE_SIZE",
  PAGE_SORT: "PAGE_SORT",
  PAGE_SEARCH: "PAGE_SEARCH",
  PAGE_SEARCH_RESET: "PAGE_SEARCH_RESET",
});

export function pageNext(value) {
  return {
    type: ActionType.PAGE_NEXT,
    payload: value,
  };
}

export function pageSize(value) {
  return {
    type: ActionType.PAGE_SIZE,
    payload: value,
  };
}

export function pageSort(direction, accessor) {
  return {
    type: ActionType.PAGE_SORT,
    payload: {
      direction: direction,
      accessor: accessor,
    },
  };
}

export function pageSearch(value) {
  return {
    type: ActionType.PAGE_SEARCH,
    payload: value,
  };
}

export function pageSearchReset() {
  return {
    type: ActionType.PAGE_SEARCH_RESET,
  };
}
