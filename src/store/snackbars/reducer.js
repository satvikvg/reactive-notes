import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  configuration: {
    action: null,
    anchorOrigin: { vertical: "bottom", horizontal: "center" },
    autoHideDuration: null,
    ContentProps: null,
    message: null,
    onClose: null,
    open: false
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SHOW_SNACKBAR:
      return state.merge(action);
    case types.HIDE_SNACKBAR:
      return state.merge(action);
    default:
      return state;
  }
}

// Selectors -----
export function getConfiguration(state) {
  return state.snackbars.configuration;
}
