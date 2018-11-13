import * as types from "./actionTypes";

export function showSnackbar(configuration) {
  return (dispatch, getState) => {
    try {
      dispatch({ type: types.SHOW_SNACKBAR, configuration });
    } catch (error) {
      console.error(error);
    }
  };
}

export function hideSnackbar() {
  return (dispatch, getState) => {
    try {
      const configuration = {
        open: false
      };
      dispatch({ type: types.HIDE_SNACKBAR, configuration });
    } catch (error) {
      console.error(error);
    }
  };
}
