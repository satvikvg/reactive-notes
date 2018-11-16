import * as types from "./actionTypes";
import Immutable from "seamless-immutable";
import { ThemeModes } from "../../../config/themeConfig";

const initialState = Immutable({
  firstTimeSetup: {
    fts: false
  },
  theme: {
    mode: ThemeModes.LIGHT,
    themeSelected: "bluePink"
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SAVE_SETTINGS:
      return state.merge(action.settings);

    case types.SET_THEME:
      return state.merge({
        theme: {
          themeSelected: action.theme.themeSelected,
          mode: action.theme.mode
        }
      });

    case types.SET_THEME_MODE:
      return state.merge({ theme: { mode: action.mode } });

    default:
      return state;
  }
}

// Selectors --------
export function getThemeSelected(state) {
  return state.settings.theme.themeSelected;
}

export function getThemeMode(state) {
  return state.settings.theme.mode;
}
