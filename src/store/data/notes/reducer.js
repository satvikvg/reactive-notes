import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  notes: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.NOTES_FETCHED:
      return state.merge({
        notes: action.notes
      });

    default:
      return state;
  }
}

// Selectors -----
export function getNotes(state) {
  return state.notes.notes;
}
