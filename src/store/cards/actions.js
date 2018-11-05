import * as dialogActionTypes from "../dialogs/actionTypes";

export function getNotes() {}

export function editNote(id, service) {
  return async (dispatch, getState) => {
    try {
      await service.getNote(id, snapshot => {
        if (snapshot.exists) {
          const note = {
            id: snapshot.key,
            type: snapshot.val().type,
            title: snapshot.val().title,
            content: snapshot.val().content
          };

          const newNoteDialog = {
            isOpen: true,
            note: note
          };

          dispatch({
            type: dialogActionTypes.OPEN_NEW_NOTE_DIALOG,
            newNoteDialog
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function deleteNote(id, service) {
  return (dispatch, getState) => {
    try {
      service.deleteNote(id);
    } catch (error) {
      console.error(error);
    }
  };
}
