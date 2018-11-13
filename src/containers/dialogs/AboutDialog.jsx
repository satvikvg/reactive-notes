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
            Version <b>0.1-BETA</b>
            <br />
            Developed by <b>Satvik Gadag</b>
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
