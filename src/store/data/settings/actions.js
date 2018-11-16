import * as types from "./actionTypes";
import { ThemeModes } from "../../../config/themeConfig";

export function saveSettings(settings) {
  return (dispatch, getState) => {
    try {
      if (settings != null && settings.length) {
        dispatch({ type: types.SAVE_SETTINGS, settings: settings });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export function setTheme(themeSelected) {
  return (dispatch, getState) => {
    try {
      const state = getState();
      const theme = {
        themeSelected: themeSelected,
        mode: state.settings.theme.mode
      };
      dispatch({ type: types.SET_THEME, theme });
    } catch (error) {
      console.error(error);
    }
  };
}

export function setThemeMode(mode = ThemeModes.LIGHT) {
  return (dispatch, getState) => {
    try {
      dispatch({ type: types.SET_THEME_MODE, mode: mode });
    } catch (error) {}
  };
}
