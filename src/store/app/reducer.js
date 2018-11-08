import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  user: undefined,
  pages: {
    render: undefined
  },
  mainDrawer: {
    open: false
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.NAVIGATE_SIGN_IN:
      return state.merge(action);

    case types.NAVIGATE_SIGN_UP:
      return state.merge(action);

    case types.NAVIGATE_HOME:
      return state.merge(action);

    case types.MAIN_DRAWER_OPEN:
      return state.merge(action);

    case types.MAIN_DRAWER_CLOSE:
      return state.merge(action);

    default:
      return state;
  }
}

// Selectors -----
export function getPageToRender(state) {
  return state.app.pages.render;
}

/**
 * Returns true if main navigation drawer is open.
 * @param {boolean} state Global state.
 */
export function isMainDrawerOpen(state) {
  return state.app.mainDrawer.open;
}
