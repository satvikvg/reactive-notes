import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  newNoteDialog: {
    isOpen: false,
    note: undefined
  },
  settingsDialogProps: {
    open: false,
    onClose: null
  },
  aboutDialogProps: {
    open: false
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOGGLE_NEW_NOTE_DIALOG:
      if (state.newNoteDialog.isOpen) {
        return state.merge({
          newNoteDialog: {
            isOpen: false,
            note: action.newNoteDialog.note
          }
        });
      } else {
        return state.merge({
          newNoteDialog: {
            isOpen: true,
            note: action.newNoteDialog.note
          }
        });
      }

    case types.OPEN_NEW_NOTE_DIALOG:
      return state.merge(action);

    case types.CLOSE_NEW_NOTE_DIALOG:
      return state.merge(action);

    case types.TOGGLE_SETTINGS_DIALOG:
      return state.merge(action);

    case types.TOGGLE_ABOUT_DIALOG:
      return state.merge(action);

    default:
      return state;
  }
}

// Selectors -----
export function getIsNewNoteDialogIsOpen(state) {
  return state.dialogs.newNoteDialog.isOpen;
}

export function getNoteAssociatedToDialog(state) {
  return state.dialogs.newNoteDialog.note;
}

export function getSettingsDialogProps(state) {
  return state.dialogs.settingsDialogProps;
}

export function getAboutDialogProps(state) {
  return state.dialogs.aboutDialogProps;
}
