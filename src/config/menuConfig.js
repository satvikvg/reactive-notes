import * as notesActionTypes from "../store/data/notes/actionTypes";
import * as dialogActionTypes from "../store/dialogs/actionTypes";
import * as Icons from "@material-ui/icons";

export const menuItems = [
  {
    name: "Notes",
    icon: Icons.Notes,
    type: "MenuItem",
    action: notesActionTypes.GET_NOTES
  },
  {
    name: "Starred",
    icon: Icons.Star,
    type: "MenuItem",
    action: notesActionTypes.GET_STARRED_NOTES
  },
  {
    name: "Archive",
    icon: Icons.Archive,
    type: "MenuItem",
    action: notesActionTypes.GET_ARCHIVED_NOTES
  },
  {
    name: "Trash",
    icon: Icons.Delete,
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
    icon: Icons.Settings,
    type: "MenuItem",
    action: dialogActionTypes.TOGGLE_SETTINGS_DIALOG
  },
  {
    name: "About",
    icon: Icons.Info,
    type: "MenuItem",
    action: dialogActionTypes.TOGGLE_ABOUT_DIALOG
  }
];
