import React, { Fragment } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import PropTypes from "prop-types";
import * as dialogActionTypes from "../../store/dialogs/actionTypes";
import * as dialogActions from "../../store/dialogs/actions";
import * as dialogSelector from "../../store/dialogs/reducer";
import * as settingsActions from "../../store/data/settings/actions";
import * as settingsSelector from "../../store/data/settings/reducer";
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
import { themes, ThemeModes } from "../../config/themeConfig";
import ThemeChooserDialog from "./ThemeChooserDialog";
import { Switch } from "@material-ui/core";

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

    this.themes = themes;
    this.initialTheme = props.theme.themeSelected;
    this.state = {
      themeSelectedName: this.themes[this.props.theme.themeSelected].name
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.theme.themeSelected !== nextProps.theme.themeSelected) {
      const state = { ...this.state };
      let theme = this.themes[this.props.theme.themeSelected];

      if (nextProps.theme.themeSelected !== undefined) {
        theme = this.themes[nextProps.theme.themeSelected];
      }

      if (theme !== undefined) {
        state.themeSelectedName = theme.name;

        this.setState(state);
      }
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
            <ListItem button divider onClick={this.handleToggleThemeMode}>
              <ListItemText
                primary="Theme Mode"
                secondary={
                  this.props.theme.mode === ThemeModes.LIGHT ? "Light" : "Dark"
                }
              />
              <Switch
                checked={
                  this.props.theme.mode === ThemeModes.LIGHT ? false : true
                }
                onChange={this.handleToggleThemeMode}
                value={this.props.theme.mode}
              />
            </ListItem>
          </List>
        </Dialog>
        <ThemeChooserDialog
          classes={{
            paper: classes.paper
          }}
          open={this.props.themeChooserDialogProps.open}
          onClose={this.handleThemeChooserClose}
          onSelected={this.handleThemeChooserOk}
          themeSelected={this.props.theme.themeSelected}
          changeTheme={this.handleChangeTheme}
        />
      </Fragment>
    );
  }

  handleClickListItem(action) {
    switch (action) {
      case dialogActionTypes.TOGGLE_THEME_CHOOSER_DIALOG:
        this.props.dispatch(
          dialogActions.toggleThemeChooserDialog({ open: false })
        );
        break;

      default:
        return;
    }
  }

  handleThemeChooserOk() {
    this.props.dispatch(dialogActions.toggleThemeChooserDialog({ open: true }));
  }

  handleThemeChooserClose() {
    this.props.dispatch(dialogActions.toggleThemeChooserDialog({ open: true }));
    this.props.dispatch(settingsActions.setTheme(this.initialTheme));
  }

  handleChangeTheme(themeSelected) {
    this.props.dispatch(settingsActions.setTheme(themeSelected));
  }

  handleToggleThemeMode() {
    const mode =
      this.props.theme.mode === ThemeModes.LIGHT
        ? ThemeModes.DARK
        : ThemeModes.LIGHT;
    this.props.dispatch(settingsActions.setThemeMode(mode));
  }
}

SettingsDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    settingsDialogProps: dialogSelector.getSettingsDialogProps(state),
    themeChooserDialogProps: dialogSelector.getThemeChooserDialogProps(state),
    theme: {
      themeSelected: settingsSelector.getThemeSelected(state),
      mode: settingsSelector.getThemeMode(state)
    }
  };
}

export default connect(mapStateToProps)(withStyles(styles)(SettingsDialog));
