import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogTitle,
  withStyles
} from "@material-ui/core";
import * as dialogActions from "../../store/dialogs/actions";
import * as dialogSelectors from "../../store/dialogs/reducer";
import * as snackbarActions from "../../store/snackbars/actions";
import { NoteTypes, NoteStates } from "../../constants/NoteConstants";
import FirebaseService from "../../services/FirebaseService";

const styles = theme => ({
  title: {
    fontWeight: "600"
  }
});

const DIALOG_ELEMENT = "addNoteDialog.DIALOG_ELEMENT";

class AddNoteDialog extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      // Defines which element to render [Default: Dialog].
      renderElement: DIALOG_ELEMENT,

      // Holds props of snackBar.
      snackbarProps: {
        open: false,
        message: "Saved"
      }
    };
    const user = FirebaseService.auth().currentUser;
    this.db = FirebaseService.database().ref("notes/" + user.uid);
    this.snackbarProps = {
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      autoHideDuration: 4000,
      onClose: this.handleSnackbarClose,
      open: false,
      ContentProps: {
        "aria-describedby": "message-id"
      },
      message: null
    };
  }

  render() {
    return <Fragment>{this.renderDialog()}</Fragment>;
  }

  renderDialog() {
    const { classes, note, isOpen } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={this.handleInputChange}
            defaultValue={note && note.title ? note.title : ""}
            className={classes.title}
          />

          <TextField
            autoFocus
            margin="dense"
            id="content"
            multiline={true}
            rows={3}
            rowsMax={8}
            type="text"
            required={true}
            fullWidth
            placeholder="Take a note..."
            onChange={this.handleInputChange}
            defaultValue={note && note.content ? note.content : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => this.handleAdd(this.state.note)}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleInputChange(event) {
    let note;
    switch (event.target.id) {
      case "title":
        note = { ...this.state.note };
        note.title = event.target.value;
        this.setState({ note });
        break;

      case "content":
        note = { ...this.state.note };
        note.content = event.target.value;
        this.setState({ note });
        break;

      default:
        break;
    }
  }

  handleAdd(noteToAdd) {
    const note = { ...this.props.note };

    if (noteToAdd.title !== undefined) {
      note.title = noteToAdd.title;
    }

    if (noteToAdd.content !== undefined) {
      note.content = noteToAdd.content;
    }

    this.handleClose();
    if (note.id) {
      this.db.child(note.id).update(note, () => {
        this.setSnackbar(true, "Updated");
      });
    } else {
      this.db.push(note, () => {
        this.setSnackbar(true);
      });
    }
  }

  handleClose() {
    this.props.dispatch(dialogActions.closeNewNoteDialog());
  }

  handleSnackbarClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    this.props.dispatch(snackbarActions.hideSnackbar());
  }

  setSnackbar(open, message = "Saved") {
    this.snackbarProps.open = open;
    this.snackbarProps.message = message;

    this.props.dispatch(snackbarActions.showSnackbar(this.snackbarProps));
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  const open = dialogSelectors.getIsNewNoteDialogIsOpen(state);

  let note;
  if (dialogSelectors.getNoteAssociatedToDialog(state)) {
    note = dialogSelectors.getNoteAssociatedToDialog(state);
  } else {
    note = {
      id: null,
      type: NoteTypes.TEXT,
      title: undefined,
      content: undefined,
      starred: false,
      state: NoteStates.DEFAULT
    };
  }

  return {
    isOpen: open,
    note
  };
}

export default connect(mapStateToProps)(withStyles(styles)(AddNoteDialog));
