import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import autoBind from "react-autobind";
import FirebaseService from "../../../services/FirebaseService";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Icon,
  SwipeableDrawer
} from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import * as appActions from "../../../store/app/actions";
import * as appSelector from "../../../store/app/reducer";
import { menuItems } from "../../../config/menuConfig";
import NotesService from "../../../services/NotesService";
import * as notesActionTypes from "../../../store/notes/actionTypes";
import * as notesActions from "../../../store/notes/actions";
import * as dialogActionTypes from "../../../store/dialogs/actionTypes";
import * as dialogActions from "../../../store/dialogs/actions";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  icon: {
    fontSize: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 2,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.54)"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class AppDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItem: {
        selectedAction: notesActionTypes.GET_NOTES
      }
    };
    const user = FirebaseService.auth().currentUser;
    this.db = FirebaseService.database();
    this.notesService = new NotesService(this.db, user);
    autoBind(this);
  }

  render() {
    const { classes, theme, mainDrawer } = this.props;

    return (
      <Fragment>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              classes.sectionDesktop,
              !mainDrawer.open && classes.drawerPaperClose
            )
          }}
          open={mainDrawer.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerToggle}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>{this.getMenuItems()}</List>
        </Drawer>

        <SwipeableDrawer
          open={mainDrawer.open}
          onClose={this.handleDrawerToggle}
          onOpen={this.handleDrawerToggle}
          className={classes.sectionMobile}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleDrawerToggle}
            onKeyDown={this.handleDrawerToggle}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerToggle}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            {this.getMenuItems()}
          </div>
        </SwipeableDrawer>
      </Fragment>
    );
  }

  handleDrawerToggle() {
    this.props.mainDrawer.open
      ? this.props.dispatch(appActions.closeMainDrawer())
      : this.props.dispatch(appActions.openMainDrawer());
  }

  getMenuItems() {
    const items = [];
    const { classes } = this.props;
    const { selectedAction } = this.state.menuItem;

    menuItems.forEach(item => {
      switch (item.type) {
        case "MenuItem":
          items.push(
            <ListItem
              button
              key={item.name}
              onClick={() => this.handleMenuItemClick(item.action)}
              selected={selectedAction === item.action ? true : false}
            >
              <Icon className={classNames(classes.icon, item.icon)} />
              <ListItemText primary={item.name} />
            </ListItem>
          );
          break;

        case "Divider":
          items.push(<Divider key={items.length} />);
          break;

        default:
          break;
      }
    });

    return items;
  }

  handleMenuItemClick(action) {
    switch (action) {
      case notesActionTypes.GET_NOTES:
        this.notesService.detachCallback("value", this.onNotesReceived);
        this.notesService.getNotes("value", this.onNotesReceived);
        this.setSelectedAction(action);
        break;

      case notesActionTypes.GET_STARRED_NOTES:
        this.notesService.detachCallback("value", this.onNotesReceived);
        this.notesService.getStarredNotes("value", this.onNotesReceived);
        this.setSelectedAction(action);
        break;

      case notesActionTypes.GET_ARCHIVED_NOTES:
        this.notesService.detachCallback("value", this.onNotesReceived);
        this.notesService.getArchivedNotes("value", this.onNotesReceived);
        this.setSelectedAction(action);
        break;

      case notesActionTypes.GET_TRASHED_NOTES:
        this.notesService.detachCallback("value", this.onNotesReceived);
        this.notesService.getTrashedNotes("value", this.onNotesReceived);
        this.setSelectedAction(action);
        break;

      case dialogActionTypes.TOGGLE_SETTINGS_DIALOG:
        this.props.dispatch(
          dialogActions.toggleSettingsDialog({ open: false })
        );
        break;

      case dialogActionTypes.TOGGLE_ABOUT_DIALOG:
        this.props.dispatch(dialogActions.toggleAboutDialog({ open: false }));
        break;

      default:
        break;
    }
  }

  setSelectedAction(action) {
    const menuItem = { ...this.state.menuItem };
    menuItem.selectedAction = action;

    this.setState({ menuItem });
  }

  onNotesReceived(snapshot) {
    this.props.dispatch(notesActions.notesFetched(snapshot));
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    mainDrawer: {
      open: appSelector.isMainDrawerOpen(state)
    }
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(AppDrawer)
);
