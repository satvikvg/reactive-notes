import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as dialogActions from "../../store/dialogs/actions";
import * as dialogSelector from "../../store/dialogs/reducer";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SettingsDialog extends React.Component {
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.dispatch(dialogActions.toggleSettingsDialog({ open: true }));
  };

  render() {
    const { classes, settingsDialogProps } = this.props;
    return (
      <Dialog
        fullScreen
        open={settingsDialogProps.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Settings
            </Typography>
            <Button color="inherit" onClick={this.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    );
  }
}

SettingsDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    settingsDialogProps: dialogSelector.getSettingsDialogProps(state)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(SettingsDialog));
