import React, { Fragment } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import PropTypes from "prop-types";
import * as dialogActionTypes from "../../store/dialogs/actionTypes";
import * as dialogActions from "../../store/dialogs/actions";
import * as dialogSelector from "../../store/dialogs/reducer";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { themes } from "../../config/themeConfig";
import ThemeChooserDialog from "./ThemeChooserDialog";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  paper: {
    width: "80%",
    maxHeight: 435
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SettingsDialog extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      themeChooserDialog: {
        open: false
      }
    };

    this.themes = themes;
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props !== nextProps.themeSelectedName ||
      this.props.themeSelected !== nextProps.themeSelected
    ) {
      const state = { ...this.state };
      state.themeSelected = nextProps.themeSelected;
      state.themeSelectedName = nextProps.themeSelectedName;

      this.setState(state);
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.dispatch(dialogActions.toggleSettingsDialog({ open: true }));
  };

  render() {
    const { classes, settingsDialogProps } = this.props;
    return (
      <Fragment>
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
            <ListItem
              button
              divider
              aria-haspopup="true"
              aria-controls="theme-menu"
              aria-label="Theme"
              onClick={() =>
                this.handleClickListItem(
                  dialogActionTypes.TOGGLE_THEME_CHOOSER_DIALOG
                )
              }
            >
              <ListItemText
                primary="Theme"
                secondary={this.state.themeSelectedName}
              />
            </ListItem>
          </List>
        </Dialog>
        <ThemeChooserDialog
          classes={{
            paper: classes.paper
          }}
          open={this.state.themeChooserDialog.open}
          onClose={this.handleThemeChooserClose}
          themeSelected={this.state.themeSelected}
        />
      </Fragment>
    );
  }

  handleClickListItem(action) {
    switch (action) {
      case dialogActionTypes.TOGGLE_THEME_CHOOSER_DIALOG:
        this.setState({ themeChooserDialog: { open: true } });
        break;

      default:
        return;
    }
  }

  handleThemeChooserClose(themeSelected) {
    const palette = this.themes[themeSelected].palette;
    this.props.changeTheme({ palette: palette });

    this.setState({
      themeSelected: themeSelected,
      themeSelectedName: this.themes[themeSelected].name,
      themeChooserDialog: {
        open: false
      }
    });
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
