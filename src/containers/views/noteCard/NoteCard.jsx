import React, { Component } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import firebase from "firebase";
import PropTypes from "prop-types";
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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import * as cardActions from "../../../store/cards/actions";
import NotesService from "../../../services/NotesService";

const styles = theme => ({
  card: {
    width: "fill-available",
    margin: theme.spacing.unit,
    float: "left"
  }
});

class NoteCard extends Component {
  constructor(props) {
    super(props);
    const user = firebase.auth().currentUser;
    this.db = firebase.database();
    this.notesService = new NotesService(this.db, user);
    autoBind(this);
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
              onClick={() => this.handleEditClick(note.id)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              className={classes.button + " noteActions"}
              aria-label="Delete"
              onClick={() => this.handleDeleteClick(note.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }

  handleEditClick(id) {
    this.props.dispatch(cardActions.editNote(id, this.notesService));
  }

  handleDeleteClick(id) {
    this.props.dispatch(cardActions.deleteNote(id, this.notesService));
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
