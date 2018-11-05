import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  noteCard: {
    action: undefined,
    noteId: undefined
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.NOTE_CARD_EDIT:
      return state.merge(action);

    case types.NOTE_CARD_DELETE:
      return state.merge(action);

    default:
      return state;
  }
}

// Selectors -----
export function getNoteCard(state) {
  return state.cards.noteCard;
}
