import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import NotesContainer from "../../../containers/notes/NotesContainer";

const styles = theme => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  }
});

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <NotesContainer style={{ backgroundColor: "#e8e8e8" }} />
      </main>
    );
  }
}

export default withStyles(styles)(Container);
