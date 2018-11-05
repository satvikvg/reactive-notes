import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  colorPrimary: {
    backgroundColor: "#B2DFDB"
  },
  barColorPrimary: {
    backgroundColor: "#00695C"
  }
});

function LinearProgress(props) {
  const { classes } = props;
  return (
    <LinearProgress
      classes={{
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary
      }}
    />
  );
}

LinearProgress.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LinearProgress);
