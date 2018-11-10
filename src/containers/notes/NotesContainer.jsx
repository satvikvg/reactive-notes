import React, { Component } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import firebase from "firebase";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import NoteCard from "../views/noteCard/NoteCard";
import NewNote from "../../components/views/buttons/fabs/NewNote";
import * as notesActions from "../../store/notes/actions";
import * as notesSelector from "../../store/notes/reducer";
import * as dialogActions from "../../store/dialogs/actions";
import AddNoteDialog from "../dialogs/AddNoteDialog";
import NotesService from "../../services/NotesService";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class NotesContainer extends Component {
  constructor(props) {
    super(props);
    const user = firebase.auth().currentUser;
    this.db = firebase.database();
    this.notesService = new NotesService(this.db, user);
    autoBind(this);
  }

  componentDidMount() {
    this.notesService.getNotes("value", this.onNotesReceived);
  }

  render() {
    const { classes } = this.props;
    if (!this.props.notes) return this.renderLoading();
    const notes = this.props.notes;
    return (
      <div className="notesContainer">
        <div className={classes.root}>
          <Grid container spacing={0}>
            {this.renderMediaCards(notes)}
          </Grid>
          <NewNote handleClick={this.openNewNoteDialog} />
        </div>
        <AddNoteDialog />
      </div>
    );
  }

  componentWillUnmount() {
    this.notesService.detachAllCallbacks();
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderMediaCards(notes) {
    return notes.map(note => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={note.id}>
          <NoteCard note={note} />
        </Grid>
      );
    });
  }

  openNewNoteDialog() {
    this.props.dispatch(dialogActions.openNoteDialog());
  }

  onNotesReceived(snapshot) {
    this.props.dispatch(notesActions.notesFetched(snapshot));
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    notes: notesSelector.getNotes(state)
  };
}

NotesContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(NotesContainer));
