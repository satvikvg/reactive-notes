import React, { Component } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import PropTypes from "prop-types";
import { NoteStates } from "../../../constants/NoteConstants";
import * as snackbarActions from "../../../store/snackbars/actions";
import * as dialogActions from "../../../store/dialogs/actions";
import NotesService from "../../../services/NotesService";
import FirebaseService from "../../../services/FirebaseService";
import "./NoteCard.css";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  CardActions,
  Tooltip,
  IconButton
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  card: {
    width: "fill-available",
    margin: theme.spacing.unit,
    float: "left"
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

class NoteCard extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    const user = FirebaseService.auth().currentUser;
    this.db = FirebaseService.database();
    this.notesService = new NotesService(this.db, user);
    this.snackbarProps = {
      action: [
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={this.props.classes.close}
          onClick={this.handleSnackbarClose}
        >
          <CloseIcon />
        </IconButton>
      ],
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
      },
      autoHideDuration: 4000,
      ContentProps: {
        "aria-describedby": "message-id"
      },
      message: null,
      onClose: this.handleSnackbarClose,
      open: false
    };
  }
  render() {
    const { classes, note } = this.props;

    return (
      <Card className={classes.card + " noteContent"} id={note.id}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {note.title}
          </Typography>
          <Typography component="p">{note.content}</Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Edit">
            <IconButton
              className={classes.button + " noteActions"}
              aria-label="Edit"
              onClick={() =>
                this.notesService.getNote(note.id, note => {
                  if (note === null) return;

                  this.handleEditClick(note);
                })
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={note.starred ? "Remove Starred" : "Set Starred"}>
            <IconButton
              className={classes.button + " noteActions"}
              aria-label="Starred"
              onClick={() =>
                this.notesService.toggleStarred(
                  note,
                  function(error) {
                    if (error) {
                      console.error(error);
                    } else {
                      this.snackbarProps.message = (
                        <span id="message-id">
                          {note.starred ? "Note Unstarred" : "Note Starred"}
                        </span>
                      );
                      this.showSnackbar();
                    }
                  }.bind(this)
                )
              }
            >
              {note.starred ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip
            title={note.state === NoteStates.ARCHIVED ? "Unarchive" : "Archive"}
          >
            <IconButton
              className={classes.button + " noteActions"}
              aria-label="Starred"
              onClick={() =>
                this.notesService.toggleArchived(note, error => {
                  if (error) {
                    console.error(error);
                  } else {
                    this.snackbarProps.message = (
                      <span id="message-id">
                        {note.state === NoteStates.ARCHIVED
                          ? "Note Unarchived"
                          : "Note Archived"}
                      </span>
                    );
                    this.showSnackbar();
                  }
                })
              }
            >
              {note.state === NoteStates.ARCHIVED ? (
                <UnarchiveIcon />
              ) : (
                <ArchiveIcon />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip
            title={note.state === NoteStates.TRASHED ? "Recover" : "Trash"}
          >
            <IconButton
              className={classes.button + " noteActions"}
              aria-label="Delete"
              onClick={() =>
                this.notesService.toggleTrashed(note, error => {
                  if (error) {
                    console.error(error);
                  } else {
                    this.snackbarProps.message = (
                      <span id="message-id">
                        {note.state === NoteStates.TRASHED
                          ? "Note Recovered"
                          : "Note Trashed"}
                      </span>
                    );

                    this.showSnackbar();
                  }
                })
              }
            >
              {note.state === NoteStates.TRASHED ? (
                <RefreshIcon />
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
          </Tooltip>

          {note.state === NoteStates.TRASHED ? (
            <Tooltip title="Delete Forever">
              <IconButton
                className={classes.button + " noteActions"}
                aria-label="Delete Forever"
                onClick={() =>
                  this.notesService.deleteNote(note.id, error => {
                    if (error) {
                      console.error(error);
                    } else {
                      this.snackbarProps.message = (
                        <span id="message-id">Note deleted</span>
                      );

                      this.showSnackbar();
                    }
                  })
                }
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </CardActions>
      </Card>
    );
  }

  showSnackbar() {
    this.snackbarProps.open = true;
    this.props.dispatch(snackbarActions.showSnackbar(this.snackbarProps));
  }

  handleSnackbarClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.props.dispatch(snackbarActions.hideSnackbar());
  }

  handleEditClick(note) {
    this.props.dispatch(dialogActions.openNoteDialog(note));
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {};
}

NoteCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(NoteCard));
