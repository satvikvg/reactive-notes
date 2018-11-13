import * as types from "./actionTypes";

export function notesFetched(snapshot) {
  return async (dispatch, getState) => {
    try {
      let notes = [];
      if (snapshot.exists) {
        snapshot.forEach(childSnapshot => {
          const note = {
            id: childSnapshot.key,
            type: childSnapshot.val().type,
            title: childSnapshot.val().title,
            content: childSnapshot.val().content,
            starred: childSnapshot.val().starred,
            state: childSnapshot.val().state
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
