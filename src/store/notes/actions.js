import * as types from "./actionTypes";
import NotesService from "../../services/NotesService";

export function getNotes(eventType, callback) {
  NotesService.getNotes(eventType, callback);
}

export function notesFetched(snapshot) {
  return async (dispatch, getState) => {
    try {
      let notes = [];
      if (snapshot.exists) {
        snapshot.forEach(childSnapshot => {
          const note = {
            id: childSnapshot.key,
            title: childSnapshot.val().title,
            content: childSnapshot.val().content
          };

          notes.push(note);
        });
      }
      dispatch({ type: types.NOTES_FETCHED, notes });
    } catch (error) {
      console.error(error);
    }
  };
}
