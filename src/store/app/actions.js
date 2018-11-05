import * as types from "./actionTypes";

export function navigateSignIn() {
  const pages = {
    render: types.NAVIGATE_SIGN_IN
  };

  return (dispatch, getState) => {
    try {
      dispatch({ type: types.NAVIGATE_SIGN_IN, pages });
    } catch (error) {
      console.error(error);
    }
  };
}

export function navigateRegister() {
  const pages = {
    render: types.NAVIGATE_SIGN_UP
  };

  return (dispatch, getState) => {
    try {
      dispatch({ type: types.NAVIGATE_SIGN_UP, pages });
    } catch (error) {
      console.error(error);
    }
  };
}

export function navigateHome(user) {
  const pages = {
    render: types.NAVIGATE_HOME
  };

  return (dispatch, getState) => {
    try {
      dispatch({ type: types.NAVIGATE_HOME, pages });
    } catch (error) {
      console.error(error);
    }
  };
}
