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

export function toggleSettingsDialog(settingsDialogProps) {
  return (dispatch, getState) => {
    try {
      settingsDialogProps.open = settingsDialogProps.open ? false : true;
      dispatch({ type: types.TOGGLE_SETTINGS_DIALOG, settingsDialogProps });
    } catch (error) {
      console.error(error);
    }
  };
}

export function toggleThemeChooserDialog(themeChooserDialogProps) {
  return (dispatch, getState) => {
    try {
      themeChooserDialogProps.open = themeChooserDialogProps.open
        ? false
        : true;
      dispatch({
        type: types.TOGGLE_THEME_CHOOSER_DIALOG,
        themeChooserDialogProps
      });
    } catch (error) {}
  };
}

export function toggleAboutDialog(aboutDialogProps) {
  return (dispatch, getState) => {
    try {
      aboutDialogProps.open = aboutDialogProps.open ? false : true;
      dispatch({ type: types.TOGGLE_ABOUT_DIALOG, aboutDialogProps });
    } catch (error) {
      console.error(error);
    }
  };
}
