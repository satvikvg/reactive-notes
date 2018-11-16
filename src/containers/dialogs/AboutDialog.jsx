import React from "react";
import { connect } from "react-redux";
import * as dialogActions from "../../store/dialogs/actions";
import * as dialogSelector from "../../store/dialogs/reducer";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Typography } from "@material-ui/core";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AboutDialog extends React.Component {
  handleClose = () => {
    this.props.dispatch(dialogActions.toggleAboutDialog({ open: true }));
  };

  render() {
    const { aboutDialogProps } = this.props;

    return (
      <Dialog
        open={aboutDialogProps.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"About"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography component="h6" variant="subheading">
              Developed By <b>Satvik Gadag</b>
            </Typography>
            <h3>Change Log</h3>
            <h4>Version 1.0 Beta</h4>
            <p>Release Date: 16/11/2018</p>
            <ul>
              <li>Ability to Star, Archive, Trash &amp; Recover notes.</li>
              <li>Added new Navigation Drawer.</li>
              <li>
                Added 'Theme Chooser' with 10 different themes to choose from.
              </li>
              <li>
                Added theme mode to switch between 'Light' and 'Dark' theme
                mode.
              </li>
              <li>
                Included 'Change logs' in about section which you are reading
                right now ;)
              </li>
              <li>
                Several bugs fixes were included to improve user experience.
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    aboutDialogProps: dialogSelector.getAboutDialogProps(state)
  };
}

export default connect(mapStateToProps)(AboutDialog);
