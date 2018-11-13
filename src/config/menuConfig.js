import * as notesActionTypes from "../store/notes/actionTypes";
import * as dialogActionTypes from "../store/dialogs/actionTypes";
export const menuItems = [
  {
    name: "Notes",
    icon: "fas fa-sticky-note",
    type: "MenuItem",
    action: notesActionTypes.GET_NOTES
  },
  {
    name: "Starred",
    icon: "far fa-star",
    type: "MenuItem",
    action: notesActionTypes.GET_STARRED_NOTES
  },
  {
    name: "Archive",
    icon: "fas fa-archive",
    type: "MenuItem",
    action: notesActionTypes.GET_ARCHIVED_NOTES
  },
  {
    name: "Trash",
    icon: "far fa-trash-alt",
    type: "MenuItem",
    action: notesActionTypes.GET_TRASHED_NOTES
  },
  {
    name: "Divider",
    icon: undefined,
    type: "Divider"
  },
  {
    name: "Settings",
    icon: "fas fa-cog",
    type: "MenuItem",
    action: dialogActionTypes.TOGGLE_SETTINGS_DIALOG
  },
  {
    name: "About",
    icon: "fas fa-info",
    type: "MenuItem",
    action: dialogActionTypes.TOGGLE_ABOUT_DIALOG
  }
];
