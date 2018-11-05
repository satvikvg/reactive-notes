import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  absolute: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function NewNoteFAB(props) {
  const { classes } = props;
  return (
    <div>
      <Button
        variant="fab"
        color="secondary"
        aria-label="Add"
        className={classes.absolute}
        onClick={props.handleClick}
      >
        <AddIcon />
      </Button>
    </div>
  );
}

NewNoteFAB.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewNoteFAB);
