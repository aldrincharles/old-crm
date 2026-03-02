import keyMirror from "keymirror";

export const ActionType = keyMirror({
  PAGE_SEARCH: "PAGE_SEARCH",
  PAGE_SEARCH_RESET: "PAGE_SEARCH_RESET",
});

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
