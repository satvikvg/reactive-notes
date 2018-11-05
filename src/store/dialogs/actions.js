import * as types from "./actionTypes";

export function toggleNewNoteDialog() {
  const payLoad = {
    toggle: true
  };

  return (dispatch, getState) => {
    try {
      dispatch({ type: types.TOGGLE_NEW_NOTE_DIALOG, payLoad });
    } catch (error) {
      console.error(error);
    }
  };
}

export function openNoteDialog(note = undefined) {
  const newNoteDialog = {
    isOpen: true,
    note: note
  };

  return (dispatch, getState) => {
    try {
      dispatch({ type: types.OPEN_NEW_NOTE_DIALOG, newNoteDialog });
    } catch (error) {
      console.error(error);
    }
  };
}

export function closeNewNoteDialog() {
  const newNoteDialog = {
    isOpen: false
  };

  return (dispatch, getState) => {
    try {
      dispatch({ type: types.CLOSE_NEW_NOTE_DIALOG, newNoteDialog });
    } catch (error) {
      console.error(error);
    }
  };
}
